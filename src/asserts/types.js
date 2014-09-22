function StringAssert() {
  this.test = function (node, value) {
    if (false === utils.isString(value)) {
      throw new AssertError(node, 'String', 'type mismatch expected `[object String]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function NumberAssert() {
  this.test = function (node, value) {
    if (false === utils.isNumber(value)) {
      throw new AssertError(node, 'Number', 'type mismatch expected `[object Number]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function BooleanAssert() {
  this.test = function (node, value) {
    if (false === utils.isBoolean(value)) {
      throw new AssertError(node, 'Boolean', 'type mismatch expected `[object Boolean]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function ObjectAssert() {
  this.test = function (node, value) {
    if (false === utils.isObject(value)) {
      throw new AssertError(node, 'Object', 'type mismatch expected `[object Object]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function ArrayAssert() {
  this.test = function (node, value) {
    if (false === utils.isArray(value)) {
      throw new AssertError(node, 'Array', 'type mismatch expected `[object Array]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function FunctionAssert() {
  this.test = function (node, value) {
    if (false === utils.isFunction(value)) {
      throw new AssertError(node, 'Function', 'type mismatch expected `[object Function]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}