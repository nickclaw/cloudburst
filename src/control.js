import _ from 'lodash';
import { Observable } from 'rxjs';

/**
 * Cast anything to an observable
 * @param {*} value
 * @return {Observable<*>}
 */
export function toObservable(value) {
  return !(value instanceof Observable)
    ? Observable.of(value)
    : value;
}

/**
 * Take an object of values and observables, only emit the
 * combination of the most recent values.
 *
 * foo = 1--2--3--4
 * bar = -a--b--c--
 *
 * combine({ foo, bar })
 *
 * { foo: 1, bar: a } -> { foo: 2, bar: a } -> { foo: 2, bar: b }
 *
 * @param {Object<*>} object
 * @return {Observable<Object>}
 */
export function combine(object) {
  const keys = _.keys(object);
  const observables = _.map(object, toObservable);

  return Observable.combineLatest(...observables, (...values) => {
    return _.transform(
      values,
      (acc, val, i) => acc[keys[i]] = val,
      {}
    );
  });
}
