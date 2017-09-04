import hue from './client/hue';
import colors from './input/colors';
import lights from './output/lights';
import * as control from './control';

async function init() {
  const state = await hue.getFullState();

  control
    .combine({
      on: true,
      bri: 255,
      hue: 65535,
      sat: 255,
      ct: 500,
    })
    .subscribe(lights({
      client: hue,
      lights: state.groups[1].lights
    }));
}
