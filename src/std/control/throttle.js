import _ from 'lodash';
import Async from '../../nodes/async-transform';

class Throttle extends Async {

  constructor({
    node,
    delay = 0,
    leading = false,
    trailing = true,
  }) {
    super();
    this.inputs = _.mapValues(node.outputTypes, (type, key) => node.getOutput(key));
    this.inputTypes = node.outputTypes;
    this.outputTypes = node.outputTypes;
    this.transform = _.throttle(obj => this.emit(obj.data), delay, { leading, trailing });
  }
}

export default function exec(options) {
  return new Throttle(options);
}
