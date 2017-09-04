import Promise from 'bluebird';
import { lightState } from 'node-hue-api';
import createSubscriber from '../subscriber';
import * as t from '../types';

export default createSubscriber({
  debug: 'cloudburst:output:lights',

  inputTypes: {
    on: t.boolean,
    bri: t.number,
    hue: t.number,
    sat: t.number,
    ct: t.number,
  },

  options: {
    client: null,
    lights: [],
  },

  handler(ctx, input) {
    const { client, lights } = ctx.options;
    const state = lightState.create()
      .on(input.on)
      .bri(input.bri)
      .hue(input.hue)
      .sat(input.sat)
      .ct(input.ct);

    const pending = lights.map(id => client.setLightState(id, state));
    return Promise.all([pending]);
  }
})
