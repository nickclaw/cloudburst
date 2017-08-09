import * as Type from '../../types';
import Node from '../../node';
import f from '../../field';

function singleArg(fn) {
  class SingleArgNode extends Node {

    inputs = {
      value: f(Type.boolean),
    };

    outputs = {
      value: f(Type.boolean),
    }

    transform({ data }) {
      return { value: fn(data.value) };
    }
  }

  return function() {
    return new SingleArgNode();
  }
}

function leftRightArgs(fn) {
  class LeftRightArgNode extends Node {

    inputs = {
      left: f(Type.boolean),
      right: f(Type.boolean),
    };

    outputs = {
      value: f(Type.boolean),
    };

    transform({ data }) {
      return { value: fn(data.left, data.right) };
    }
  }

  return function() {
    return new LeftRightArgNode();
  }
}

function compareArgs(fn) {
  class CompareArgsNode extends Node {

    inputs = {
      left: f(Type.any),
      right: f(Type.any),
    };

    outputs = {
      value: f(Type.boolean),
    };

    transform({ data }) {
      return { value: fn(data.left, data.right) };
    }
  }

  return function() {
    return new CompareArgsNode();
  }
}

export const negate = singleArg(v => !v);
export const xor = leftRightArgs((l, r) => l !== r);
export const xnor = leftRightArgs((l, r) => l === r);


export const gt = compareArgs((l, r) => l > r);
export const lt = compareArgs((l, r) => l < r);
export const gte = compareArgs((l, r) => l >= r);
export const lte = compareArgs((l, r) => l <= r);
