var utils = {};

function toString(value) {
  return Object.prototype.toString.call(value);
}

utils.callToString = toString;

utils.isString = function (value) {
  return (typeof value === 'string' || toString(value) == '[object String]');
};

utils.isNumber = function (value) {
  return (typeof value === 'number' || toString(value) == '[object Number]');
};

utils.isBoolean = function (value) {
  return (typeof value === 'boolean' || toString(value) == '[object Boolean]');
};

utils.isFunction = function (value) {
  return (typeof value === 'function' || toString(value) === '[object Function]');
};

utils.isObject = function (value) {
  return toString(value) === '[object Object]';
};

utils.isArray = function (value) {
  return toString(value) === '[object Array]';
};

utils.isRegexp = function (value) {
  return toString(value) === '[object RegExp]';
};