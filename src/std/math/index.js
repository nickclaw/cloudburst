import * as Type from '../../types';
import Node from '../../node';
import f from '../../field';

export function singleArg(fn) {
  class SingleArgNode extends Node {

    inputs = {
      value: f(Type.number).set(0),
    };

    outputs = {
      value: f(Type.number),
    }

    transform({ data }) {
      return { value: fn(data.value) };
    }
  }

  return function() {
    return new SingleArgNode();
  }
}

export function leftRightArgs(fn) {
  class LeftRightArgNode extends Node {

    inputs = {
      left: f(Type.number).set(0),
      right: f(Type.number).set(0),
    };

    outputs = {
      value: f(Type.number),
    };

    transform({ data }) {
      return { value: fn(data.left, data.right) };
    }
  }

  return function() {
    return new LeftRightArgNode();
  }
}

export { default as random } from './random';
export const abs = singleArg(Math.abs);
export const acos = singleArg(Math.acos);
export const acosh = singleArg(Math.acosh);
export const asin = singleArg(Math.asin);
export const asinh = singleArg(Math.asinh);
export const atan = singleArg(Math.atan);
export const atanh = singleArg(Math.atanh);
export const atan2 = singleArg(Math.atan2);
export const cbrt = singleArg(Math.cbrt);
export const ciel = singleArg(Math.ciel);
export const clz32 = singleArg(Math.clz32);
export const cos = singleArg(Math.cos);
export const cosh = singleArg(Math.cosh);
export const exp = singleArg(Math.exp);
export const expm1 = singleArg(Math.expm1);
export const floor = singleArg(Math.floor);
export const fround = singleArg(Math.fround);
export const log = singleArg(Math.log);
export const log1p = singleArg(Math.log1p);
export const log10 = singleArg(Math.log10);
export const log2 = singleArg(Math.log2);
export const round = singleArg(Math.round);
export const sign = singleArg(Math.sign);
export const sin = singleArg(Math.sin);
export const sinh = singleArg(Math.sinh);
export const sqrt = singleArg(Math.sqrt);
export const tan = singleArg(Math.tan);
export const tanh = singleArg(Math.tanh);
export const trunc = singleArg(Math.trunc);

// export const min = spreadArgs(Math.min);
// export const max = spreadArgs(Math.max);

// export const add = spreadArgs((...args) => args.reduce(
//   (n, val) => n + val,
//   0
// ));


export const mod = leftRightArgs((l, r) => l % r);

// TODO spread
export const add = leftRightArgs((l, r) => l + r);
export const sub = leftRightArgs((l, r) => l - r);
export const mul = leftRightArgs((l, r) => l * r);
export const div = leftRightArgs((l, r) => l / r);
export const min = leftRightArgs(Math.min);
export const max = leftRightArgs(Math.max);
export const average = leftRightArgs((l, r) => (l + r) / 2)
