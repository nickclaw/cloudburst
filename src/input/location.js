import { Observable } from 'rx';
import config from '../../config.json';

export default () => {
  return Observable.of({
    lat: config.LAT,
    long: config.LONG,
  });
}
