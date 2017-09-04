import { Observable } from 'rxjs';

export default ({
  interval = 1000,
} = {}) => {
  return Observable
    .interval(interval)
    .map(() => new Date())
}
