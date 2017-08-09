import _ from 'lodash';

export function validate(schema, value) {
  const safeValue = {};

  for (const [key, type] of Object.entries(schema)) {
    const out = type(value[key]);
    if (_.isError(out)) throw out;
    safeValue[key] = out;
  }

  return safeValue;
}

export function any(val) {
  return val;
}

export function string(val) {
  return String(val);
}

export function number(val) {
  const float = parseFloat(val, 10);
  return Number.isNaN(float)
    ? new Error(`Expected number, got ${val}`)
    : float;
}

export function boolean(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  return !!val;
}

export function union(...types) {
  return function isUnion(val) {
    let error = undefined;

    for (type of types) {
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

export function collection(type) {
  return function isCollection(val) {
    if (!Array.isArray(val)) {
      return new Error('Not an array.');
    }

    const values = val.map(type);
    const firstError = values.findIndex(_.isError);

    if (firstError >= 0) {
      const error = values[firstError];
      return new Error(`Error at index ${firstError}: {error.message}`);
    }

    return values;
  }
}

export function object(val) {
  if (!_.isPlainObject(val)) return new Error(`Expected object, got ${val}`);
  return val;
}
