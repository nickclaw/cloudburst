import _ from 'lodash';

/**
 * Any type
 * @param {*} val
 * @return {*}
 */
export function any(val) {
  return val;
}

/**
 * String type
 * @param {*} val
 * @return {String}
 */
export function string(val) {
  return String(val);
}

/**
 * Number type
 * @param {*} val
 * @return {Number|Error}
 */
export function number(val) {
  const float = parseFloat(val, 10);
  return Number.isNaN(float)
    ? new Error(`Expected number, got ${val}`)
    : float;
}

/**
 * Simple object type
 * @param {*} val
 * @return {Object|Error}
 */
export function object(val) {
  if (!_.isPlainObject(val)) return new Error(`Expected object, got ${val}`);
  return val;
}

/**
 * Boolean type
 * @param {*} val
 * @return {Boolean}
 */
export function boolean(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  return !!val;
}

/**
 * Union-type factory
 * @param {Type} ...types
 * @return {Type}
 */
export function union(...types) {
  return function isUnion(val) {
    let error = undefined;

    for (const type of types) {
      const out = type[val];
      if (_.isError(out)) {
        error = out;
      } else {
        return out;
      }
    }

    return error;
  };
}

/**
 * Collection-type factory
 * @param {Type} type
 * @return {Type}
 */
export function collection(type) {
  return function isCollection(val) {
    if (!Array.isArray(val)) {
      return new Error('Not an array.');
    }

    const values = val.map(type);
    const firstError = values.findIndex(_.isError);

    if (firstError >= 0) {
      const error = values[firstError];
      return new Error(`Error at index ${firstError}: ${error.message}`);
    }

    return values;
  }
}

/**
 * Shape-type factory
 * @param {Object} of
 * @return {Type}
 */
export function shape(of) {
  const pairs = _.toPairs(of);

  return function isShapeOf(val) {
    let err = object(val);
    if (err) return err;

    const obj = _.transform(
      pairs,
      (acc, [type, key]) => {
        const out = type(val[key]);
        if (_.isError(out)) err = out;
        acc[key] = out;
      },
      {}
    );

    return err || obj;
  }
}
