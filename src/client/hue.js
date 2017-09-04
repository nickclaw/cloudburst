import { HueApi } from 'node-hue-api';
import config from '../../config.json';

export default new HueApi(
  config.HUE_HOST,
  config.HUE_USER
);
