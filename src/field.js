import assert from 'assert';
import { EventEmitter } from 'events';

export class Field extends EventEmitter {

  /**
   * Create a field of a certain type
   * @constructor
   * @param type
   */
  constructor(type) {
    super();
    assert(typeof type === 'function', 'expected type');

    this.type = type;
    this.value = undefined;
  }

  /**
   * Return a field of a certain type
   * @param type
   * @return {Field}
   */
  to(type) {
    const field = new Field(type).set(this.get());
    this.on('change', f => field.set(f.get()));
    return this;
  }

  /**
   * Set a value
   * @param value
   * @return {Field}
   */
  set(value) {
    const out = value !== undefined
      ? this.type(value)
      : undefined;

    if (out instanceof Error) {
      throw out;
    } else if (this.value !== out) {
      this.value = value;
      this.emit('change', this);
    }

    return this;
  }

  /**
   * Get the value
   * @return {*}
   */
  get() {
    return this.value;
  }
}

export default function field(type) {
  return new Field(type);
}
