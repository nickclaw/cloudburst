import Promise from 'bluebird';
import _ from 'lodash';
import * as Type from './types';
import f, { Field } from './field';
import runtime from './runtime';


export default class Node {

  /**
   * Create a new node
   * @constructor
   */
  constructor() {
    this._flush = null;
    this._handleChange = this._handleChange.bind(this);
    this._handleError = this._handleError.bind(this);
    this._runtime = runtime;

    this.id = _.uniqueId('node-');
    this.async = false;
    this.options = {};
    this.outputs = {};
    this.inputs = {};

    this._runtime.register(this);
  }

  /**
   * Initialize the node
   * @return {Promise<Error,Node>}
   */
  async init() {
    this.options = Object.freeze(this.options);
    this.outputs = Object.freeze(this.outputs);
    this.inputs = Object.freeze(this.inputs);

    _.forOwn(this.inputs, (field) => {
      field.addListener('change', this._handleChange);
      field.addListener('error', this._handleError)
    });

    return this;
  }

  /**
   * Destroy the node
   * @return {Promise<Error,Node>}
   */
  async teardown() {
    clearImmediate(this._flush);
     _.forOwn(this.inputs, (field) => {
      field.removeListener('change', this._handleChange);
      field.removeListener('error', this._handleError)
    });
    return this;
  }

  _handleChange() {
    const fn = () => {
      this._flush = null;
      this._transform();
    };

    if (this.async && !this._flush) {
      this._flush = setImmediate(fn);
    } else if (!this.async) {
      fn(); // TODO next tick?
    }
  }

  _handleError(error) {
    this.error(error);
  }

  _transform() {
    let skip = false;
    const input = _.mapValues(this.inputs, f => {
      const val = f.get();
      skip = skip || val === undefined;
      return val;
    });
    const event = { data: input, options: this.options };

    if (skip) {
      return;
    }

    if (this.async) {
      return Promise.try(() => this.transform(event))
        .then(out => out !== undefined && this.emit(out))
        .catch(err => this.error(err));
    }

    try {
      const out = this.transform(event);
      if (out !== undefined) this.emit(out);
    } catch (err) {
      this.error(err);
    }
  }

  /**
   * Emit changes
   * @param output
   */
  emit(output) {
    _.forOwn(this.outputs, (out, k) => out.set(output[k]));
  }

  /**
   * Emit an error
   * @param error
   */
  error(error) {
    console.log(error);
  }

  transform() {
    return {};
  }

  /**
   * Set an option
   * @param key
   * @param val
   * @return {Node}
   */
  set(...args) {
    const isObject = args.length === 1
      && _.isPlainObject(args[0]);

    if (isObject) {
      _.forOwn((v, k) => this.set(k, v));
    } else {
      const [key, val] = args;
      this.options[key] = val;
    }
    return this;
  }

  /**
   * Set an input
   * @param args
   * @return {Node}
   */
  with(...args) {
    const isObject = args.length === 1
      && _.isPlainObject(args[0]);

    if (isObject) {
      _.forOwn((v, k) => this.set(k, v));
    } else {
      const [key, val] = args;
      const input = this.inputs[key];

      if (val instanceof Node) {
        this.with(key, val.get('value'));
      } else if (val instanceof Field) {
        this.inputs[key] = val.to(input.type);
      } else if (Array.isArray(val)) {
        // TODO
      } else {
        input.set(val);
      }
    }

    return this;
  }

  /**
   * Get an output
   * @param path
   * @return {Field}
   */
  get(key) {
    return this.outputs[key];
  }
}

class Spread extends Node {

  constructor(inputs) {
    super();

    this.inputs = inputs;
    this.outputs = {
      value: f(Type.collection(Type.any)),
    }
  }

  transform({ data }) {
    return { value: _.values(data) };
  }
}
