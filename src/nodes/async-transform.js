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
    this._handleUpdate = this._handleUpdate.bind(this);
    this._data = new State({}, this._handleUpdate);
  }

  async init() {
    await super.init();

    for (const [key, input] of Object.entries(this.inputs)) {
      await input.node._init();
      input.node.addListener('change', this._handleEvent);
    }
  }

  _handleEvent(node, value) {
    Object.keys(this.inputs)
      .map(key => ({ key, value: this.inputs[key] }))
      .filter(pair => pair.value.node === node)
      .forEach(pair => this._data.update({
        [pair.key]: _.get(value, pair.value.path),
      }));
  }

  async _handleUpdate(data) {
    try {
      const safeData = validate(this.inputTypes, data);
      const output = await this.transform({ data: safeData });
      if (output !== undefined) this.emit(output);
    } catch (e) {
      console.log(e.stack);
    }
  }

  async transform() {

  }
}

