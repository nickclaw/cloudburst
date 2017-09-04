import { Observable } from 'rxjs';
import Mic from 'mic';
import _ from 'lodash';

export default () => {
  const mic = new Mic({
    rate: '16000',
    channels: '1',
  });

  const stream = mic.getAudioStream();
  mic.start();

  return Observable.fromEvent(stream, 'data')
    .map(_.toArray)
    .mergeMap(_.identity)
    .bufferCount(2)
    .map(chunk => {
      let [a, b] = chunk;
      if (b > 128) b -= 256;
      return Math.abs(b * 256 + a);
    });
}
