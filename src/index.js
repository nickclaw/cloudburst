import std from './std';
import runtime from './runtime';

const rand1 = std.control.throttle() // 1
  .set('delay', 1000)
  .over(std.math.random() // 2
    .set('min', 0)
    .set('max', 5)
    .with('value', std.input.time().set('tick', 0)) // 3
  );

const rand2 = std.math.random() // 4
  .set('min', 0)
  .set('max', 5)
  .with('value', std.input.time().set('tick', 1000)); // 5

const rand3 = std.math.random() // 6
  .set('min', 0)
  .set('max', 10)
  .with('value', std.input.time().set('tick', 1000)); // 7

const sum = std.math.add() // 8
  .with('left', rand1)
  .with('right', rand2);

const _gt = std.logic.gt() // 9
  .with('left', sum)
  .with('right', rand3)

const gt = std.control.debounce() // 10
  .set('delay', 2000)
  .over(_gt)

std.output.log() // 11
  .with('value', gt);

runtime.init().then(
  () => console.log('started'),
  err => console.log(err),
);
