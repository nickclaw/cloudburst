import _ from 'lodash';
import Node from './node';
import State from '../state';
import { validate } from '../types';

export default class AsyncTransform extends Node {

  constructor() {
    super();

    this.inputs = {};
    this.outputs = {};

    this._handleEvent = this._handleEvent.bind(this);
    this._data = {};
  }

  async init() {
    await super.init();

    for (const [key, input] of Object.entries(this.inputs)) {
      await input.node._init();
      input.node.addListener('change', this._handleEvent);
    }
  }

  lock(then) {
    return then();
  }

  _handleEvent(node, value) {
    this._data = Object.keys(this.inputs)
      .map(key => ({ key, value: this.inputs[key] }))
      .filter(pair => pair.value.node === node)
      .reduce(
        (data, pair) => _.extend({}, data, { [pair.key]: _.get(value, [pair.value.path]) }),
        this._data,
      );

    this._handleUpdate();
  }

  _handleUpdate() {
    try {
      const safeData = validate(this.inputTypes, this._data);
      const output = this.transform({ data: safeData });
      this.emit(output);
    } catch (e) {
      console.log(e.stack);
    }
  }

  transform() {

  }
}

