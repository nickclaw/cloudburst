import * as Type from '../../types';
import std from '../index';

export function create({
  inputs,
  inputTypes,
}) {
  return std.control.exec({
    inputs,
    inputTypes,
    outputTypes: { value: Type.object },
    fn: (data) => ({ value: data }),
  });
}

export function explode({
  input,
  outputTypes,
}) {
  return std.control.exec({
    input: { value: input },
    inputTypes: { value: Type.object },
    outputTypes,
    fn: (data) => data,
  });
}
