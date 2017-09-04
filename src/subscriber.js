import _ from 'lodash';
import createDebug from 'debug';

function toDebug(val) {
  return typeof val === 'string'
    ? createDebug(val)
    : val;
}

export default function createSubscriberCreator({
  options: defaultOptions = {},
  debug: debugString = _.noop,
  handler,
}) {
  const debug = toDebug(debugString);

  return function createSubscriber(_options = {}) {
    const options = { ...defaultOptions, ..._options };
    const context = { options };

    debug('creating subscriber %o', context);

    return async function subscriber(input) {
      debug('recieved input %o', input);
      try {
        await handler(context, input);
        debug('handled');
      } catch (e) {
        debug('failed %s', e.stack);
      }
    }
  }
}
