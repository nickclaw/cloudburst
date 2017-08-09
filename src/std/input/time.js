import * as Type from '../../types';
import Node from '../../node';
import f from '../../field';

export class Time extends Node {

  _interval = null;

  outputs = {
    value: f(Type.number).set(Date.now()),
  };

  options = {
    tick: 0,
  };

  async init() {
    await super.init();

    this._interval = setInterval(
      this._execute,
      this.options.tick
    );
  }

  async teardown() {
    clearInterval(this._interval);
    this._interval = null;
  }

  _execute = () => {
    const value = Date.now();
    this.emit({ value });
  }
}

export default function time() {
  return new Time();
}
