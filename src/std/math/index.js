import _ from 'lodash';
import * as Type from '../../types';
import std from '../index';

function singleArg(fn) {
  return function(input) {
    return std.control.exec({
      inputs: { value: input },
      inputTypes: { value: Type.number },
      outputTypes: { value: Type.number },
      fn: (data) => ({ value: fn(data.value) }),
    });
  }
}

function spreadArgs(fn) {
  return function(inputs) {
    return std.control.exec({
      inputs,
      inputTypes: _.mapValues(inputs, () => Type.number),
      outputTypes: { value: Type.number },
      fn: (data) => ({ value: fn(..._.values(data)) })
    });
  };
}

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

export const min = spreadArgs(Math.min);
export const max = spreadArgs(Math.max);

export const add = spreadArgs((...args) => args.reduce(
  (n, val) => n + val,
  0
));

export const gt = (inputs) => std.control.exec({
  inputs,
  inputTypes: { left: Type.number, right: Type.number },
  outputTypes: { value: Type.boolean },
  fn: (data) => ({ value: data.left > data.right }),
});

export const lt = (inputs) => std.control.exec({
  inputs,
  inputTypes: { left: Type.number, right: Type.number },
  outputTypes: { value: Type.boolean },
  fn: (data) => ({ value: data.left < data.right }),
});

export const gte = (inputs) => std.control.exec({
  inputs,
  inputTypes: { left: Type.number, right: Type.number },
  outputTypes: { value: Type.boolean },
  fn: (data) => ({ value: data.left >= data.right }),
});

export const lte = (inputs) => std.control.exec({
  inputs,
  inputTypes: { left: Type.number, right: Type.number },
  outputTypes: { value: Type.boolean },
  fn: (data) => ({ value: data.left <= data.right }),
});
