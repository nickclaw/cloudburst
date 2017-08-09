import _ from 'lodash';
import * as Type from '../../types';
import std from '../index';

function spreadArgs(fn) {
  return function(inputs) {
    return std.control.exec({
      inputs,
      inputTypes: _.mapValues(inputs, () => Type.boolean),
      outputTypes: { value: Type.boolean },
      fn: (data) => ({ value: fn(..._.values(data)) })
    });
  };
}

export const and = spreadArgs((...bools) => bools.reduce(
  (acc, bool) => acc && bool,
  true
));

export const or = spreadArgs((...bools) => bools.reduce(
  (acc, bool) => acc || bool,
  false
));
