import { EventEmitter } from 'events';
import _ from 'lodash';
import { validate } from '../types';

export default class Node extends EventEmitter {

  constructor() {
    super();

    this.initPromise = null;
    this.id = _.uniqueId('node-');
    this.inputTypes = {};
    this.outputTypes = {};
  }

  _init() {
    if (!this.initPromise) this.initPromise = this.init();
    return this.initPromise;
  }

  async init() {

  }

  async teardown() {

  }

  getOutput(key) {
    return {
      node: this,
      path: [key],
    };
  }

  emit(data) {
    super.emit('change', this, validate(
      this.outputTypes,
      data
    ));
  }
}
