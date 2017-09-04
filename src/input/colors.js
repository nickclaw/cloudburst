import { Observable } from 'rxjs';
import Webcam from 'node-webcam';
import getColors from 'get-image-colors';
import createDebug from 'debug';
import os from 'os';
import path from 'path';
import shortid from 'shortid';
import time from './time';

const debug = createDebug('cloudburst:input:light');

export default ({
  width = 1280 / 16,
  height = 720 / 16,
  quality = 90,
  interval = 5000,
  directory = os.tmpdir(),
} = {}) => {

  const webcam = Webcam.create({
    width,
    height,
    quality,
    delay: 1,
    output: 'jpeg',
    device: false,
    saveShots: false,
    callbackReturn: 'buffer',
    verbose: debug.enabled,
  });

  const filePath = path.join(directory, shortid.generate());
  const capture = Observable
    .bindNodeCallback((done) => webcam.capture(filePath, done));

  const decode = (buffer) => Observable
    .fromPromise(getColors(buffer, 'image/jpeg'));

  return time({ interval })
    .switchMap(() => capture())
    .switchMap(buffer => decode(buffer));
}
