import _ from 'lodash';

function shallowEquals(a, b) {
  if (a === b) return true;
  if (!a !== !b) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  for (let i = 0; i < aKeys.length; i++) {
    if (a[aKeys[i]] !== b[aKeys[i]]) return false;
  }

  for (let i = 0; i < bKeys.length; i++) {
    if (a[bKeys[i]] !== b[bKeys[i]]) return false;
  }

  return true;
}

export default class State {

  constructor(state = {}, onUpdate) {
    this._state = state;
    this._onUpdate = onUpdate;
    this._queue = [];
  }

  update(updater) {
    const count = this._queue.push(updater);
    if (count === 1) setImmediate(() => this.flush());
  }

  flush() {
    const nextState = this._queue.reduce(
      (state, updater) => {
        return typeof update !== 'function'
          ? _.extend({}, state, updater)
          : updater(state)
      },
      this._state
    );

    this._queue = [];

    if (!shallowEquals(nextState, this._state)) {
      this._state = nextState;
      process.nextTick(() => this._onUpdate(nextState));
    }
  }
}
