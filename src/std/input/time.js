import * as Type from '../../types';
import Node from '../../nodes/node';

export class Time extends Node {

  constructor({
    tick = 0
  } = {}) {
    super();

    this._tick = tick;
    this._interval = null;
    this._execute = this._execute.bind(this);

    this.outputTypes = {
      value: Type.number,
    }
  }

  async init() {
    this._interval = setInterval(
      this._execute,
      this._tick
    );
  }

  async teardown() {
    clearInterval(this._interval);
  }

  _execute() {
    const value = Date.now();
    this.emit({ value });
  }
}

export default function time(options) {
  return new Time(options);
}
