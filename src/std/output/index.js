import util from 'util';
import _ from 'lodash';
import * as Type from '../../types';
import Transform from '../../nodes/async-transform';

class Log extends Transform {

  constructor(inputs) {
    super();

    this.inputs = inputs;
    this.inputTypes = _.mapValues(inputs, () => Type.any);
  }

  async transform({ data }) {
    console.log(util.inspect(data)); // eslint-disable-line no-console
  }
}

export function log(input) {
  return new Log(input);
}
