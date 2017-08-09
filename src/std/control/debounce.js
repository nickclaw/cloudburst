import _ from 'lodash';
import Async from '../../nodes/async-transform';

class Debounce extends Async {

  constructor({
    node,
    delay = 0,
    leading = false,
    trailing = true,
    maxWait = Infinity,
  }) {
    super();
    this.inputs = _.mapValues(node.outputTypes, (type, key) => node.getOutput(key));
    this.inputTypes = node.outputTypes;
    this.outputTypes = node.outputTypes;
    this.transform = _.debounce(
      obj => this.emit(obj.data),
      delay,
      { leading, trailing, maxWait }
    );
  }
}

export default function exec(options) {
  return new Debounce(options);
}
