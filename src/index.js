import std from './std';
import * as Type from './types';

const random1 = std.control.throttle({
  delay: 1000,
  node: std.input.random({
    tick: 1,
    min: 0,
    max: 5
  })
});

const random2 = std.input.random({
    tick: 1000,
    min: 1,
    max: 5
});

const random3 = std.input.random({
  tick: 1000,
  min: 1,
  max: 10,
});

const sum = std.math.add({
  a: random1.getOutput('value'),
  b: random2.getOutput('value'),
});

const gt = std.math.gte({
  left: random3.getOutput('value'),
  right: sum.getOutput('value'),
});

const obj = std.control.debounce({
  delay: 20,
  node: std.object.create({
    inputs: {
      larger: gt.getOutput('value'),
      a: sum.getOutput('value'),
      b: random3.getOutput('value'),
    },
    inputTypes: {
      larger: Type.boolean,
      a: Type.number,
      b: Type.number,
    }
  }),
});

const log = std.output.log({
  value: std.control.debounce({
    delay: 20,
    node: obj,
  }).getOutput('value'),
});

log.init().then(
  () => console.log('ready'),
  e => console.log(e.stack),
)
