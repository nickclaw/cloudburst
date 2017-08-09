import util from 'util';
import _ from 'lodash';
import * as Type from '../../types';
import Node from '../../node';
import f from '../../field';

class Log extends Node {

  async = true;

  inputs = {
    value: f(Type.any),
  };

  transform({ data }) {
    console.log(util.inspect(data.value)); // eslint-disable-line no-console
  }
}

export function log() {
  return new Log();
}
