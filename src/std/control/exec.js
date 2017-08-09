import Sync from '../../nodes/sync-transform';

class Exec extends Sync {

  constructor({
    inputs,
    inputTypes,
    outputTypes,
    fn,
  }) {
    super();

    this.inputs = inputs;
    this.inputTypes = inputTypes;
    this.outputTypes = outputTypes;
    this._fn = fn;
  }

  transform({ data }) {
    const fn = this._fn;
    return fn(data);
  }
}

export default function exec(options) {
  return new Exec(options);
}
