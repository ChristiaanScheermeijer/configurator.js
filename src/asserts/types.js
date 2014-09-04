function StringAssert() {
  this.test = function (node, value) {
    if (typeof value !== 'string') {
      throw new AssertError(node, 'String', 'type mismatch expected `string` got `' + typeof value + '`');
    }
    return true;
  };
}

function NumberAssert() {
  this.test = function (node, value) {
    if (typeof value !== 'number') {
      throw new AssertError(node, 'Number', 'type mismatch expected `number` got `' + typeof value + '`');
    }
    return true;
  };
}

function BooleanAssert() {
  this.test = function (node, value) {
    if (typeof value !== 'boolean') {
      throw new AssertError(node, 'Boolean', 'type mismatch expected `boolean` got `' + typeof value + '`');
    }
    return true;
  };
}

function ObjectAssert() {
  this.test = function (node, value) {
    var gotType = Object.prototype.toString.call(value);
    if ('[object Object]' !== gotType) {
      throw new AssertError(node, 'Object', 'type mismatch expected `[object Object]` got `' + gotType + '`');
    }
    return true;
  };
}

function ArrayAssert() {
  this.test = function (node, value) {
    var gotType = Object.prototype.toString.call(value);
    if ('[object Array]' !== gotType) {
      throw new AssertError(node, 'Array', 'type mismatch expected `[object Array]` got `' + gotType + '`');
    }
    return true;
  };
}