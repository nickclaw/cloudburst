import * as Type from '../../types';
import std from '../index';

export default function random({
  tick,
  max = 1,
  min = 0,
}) {
  return std.control.exec({
    inputs: { value: std.input.time({ tick }).getOutput('value') },
    inputTypes: { value: Type.number },
    outputTypes: { value: Type.number },
    fn: () => {
      const value = Math.random() * (max - min) + min;
      return { value };
    },
  });
}
