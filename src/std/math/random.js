import * as Type from '../../types';
import Node from '../../node';
import f from '../../field';

export class Random extends Node {

  options = {
    min: 0,
    max: 1,
  };

  inputs = {
    value: f(Type.any),
  };

  outputs = {
    value: f(Type.number),
  }

  transform({ options }) {
    const value = Math.random() * (options.max - options.min) + options.min;
    return { value };
  }
}

export default function() {
  return new Random();
}
