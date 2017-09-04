import time from './input/time';
import colors from './input/colors';
import * as control from './control';

control
  .combine({
    colors: colors(),
    time: time(),
    foo: 'bar',
  })
  .subscribe(console.log);
