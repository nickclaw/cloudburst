import _ from 'lodash';
import Node from '../../node';
import f from '../../field';

function identityTransform({ data }) {
  this.emit(data);
}

export class Debounce extends Node {

  constructor() {
    super();

    this._inner = null;
    this.transform = identityTransform;
    this.options = {
      delay: 0,
      leading: false,
      trailing: true,
    };
  }

  async init() {
    await super.init();

    this.transform = _.debounce(
      identityTransform.bind(this),
      this.options.delay,
      {
        leading: this.options.leading,
        trailing: this.options.trailing,
      }
    );
  }

  async teardown() {
    await super.teardown();
    this.transform.cancel();
    this.transform = identityTransform;
  }

  over(node) {
    this._inner = node;
    this.inputs = _.mapValues(node.outputs, field => field.to(field.type));
    this.outputs = _.mapValues(node.outputs, field => f(field.type));

    return this;
  }
}

export default function debounce() {
  return new Debounce();
}
