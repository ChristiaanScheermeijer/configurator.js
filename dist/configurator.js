(function(root, undefined) {

  "use strict";


/**
 * @param node
 * @param message
 *
 * @implements Error
 * @constructor
 */
function AssertError(node, assert, message) {
  Error.apply(this, [message]);

  this.node = node;
  this.name = 'AssertError';
  this.assert = assert;
  this.message = 'AssertError for ' + node.getLongname() + ': ' + message;
}

AssertError.prototype = Object.create(Error.prototype);


function GreaterThan(greaterThan) {
  this.args = Array.prototype.slice.call(arguments, 0);
  this.test = function (node, value) {
    if (typeof value === 'string' && value.length <= greaterThan) {
      throw new AssertError(node, 'GreaterThan', 'Expected value to contain ' + greaterThan + ' or more characters');
    }

    if (typeof value === 'number' && value <= greaterThan) {
      throw new AssertError(node, 'GreaterThan', 'Expected value to be greater than ' + greaterThan + ' but is ' + value);
    }

    return true;
  };
}

function LessThan(lessThan) {
  this.test = function (node, value) {
    if (typeof value === 'string' && value.length >= lessThan) {
      throw new AssertError(node, 'LessThan', 'Expected value to contain ' + lessThan + ' or less characters');
    }

    if (typeof value === 'number' && value >= lessThan) {
      throw new AssertError(node, 'LessThan', 'Expected value to be less than ' + lessThan + ' but is ' + value);
    }

    return true;
  }
}

function Regex(expression, expect) {
  var regex = RegExp(expression);
  var regexResult = expect || false;
  this.test = function (node, value) {
    if (regex.test(value) !== regexResult) {
      throw new Error('Expected ')
    }
  }
}

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

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function ArrayNode(name, children, parent) {
  Node.apply(this, [name, new ArrayAssert(), children, parent, true]);
}

ArrayNode.prototype = Object.create(Node.prototype);

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function BooleanNode(name, children, parent) {
  Node.apply(this, [name, new BooleanAssert(), children, parent, false]);
}

BooleanNode.prototype = Object.create(Node.prototype);

/**
 * @constructor
 */
function Node(name, assert, children, parent, allowChildNodes) {
  this.name = name;
  this.parent = parent;
  this.isRequired = false;
  this.childNodes = {};
  this.nodeChildren;
  this.allowChildNodes = allowChildNodes || false;
  this.asserts = assert ? [assert] : [];
  this.defaultValue;
  this.value;

  // for the argument tree builder
  if (true === this.allowChildNodes && children && children.length > 0) {
    for (var i = 0; i < children.length; i++) {
      children[i].parent = this;
      this.childNodes[children[i].name] = children[i];
    }
  }

  // for the method tree builder
  if (parent && parent.childNodes) {
    parent.childNodes[name] = this;
  }
}

Node.prototype.get = function () {
  return this.value;
};

Node.prototype.set = function (val) {
  return this.value = this.validate(val);
};

Node.prototype.required = function () {
  this.isRequired = true;
  return this;
};

Node.prototype.default = function(val) {
  this.defaultValue = val;
  return this;
};

Node.prototype.getLongname = function () {
  var name = [this.name], prev = this;

  while(prev = prev.parent) {
    if (prev.name !== 'root') {
      name.push(prev.name);
    }
  }

  return 'root[' + name.reverse().join('][') + ']';
};

Node.prototype.validate = function (value) {
  var validatedVal;

  if (typeof value === 'undefined') {
    if (true === this.isRequired) {
      throw new Error('Node `' + this.getLongname() + '` is required.');
    }

    if (this.defaultValue) {
      value = this.defaultValue;
    }else{
      return this.value;
    }
  }

  for (var i = 0; i < this.asserts.length; i++) {
    this.asserts[i].test(this, value);
  }

  if (true === this.allowChildNodes) {
    // validate ArrayNodes
    if (this instanceof ArrayNode) {
      validatedVal = [];
      if (this.childNodes && this.childNodes.all) {
        for (var i = 0; i < value.length; i++) {
          // validate same validator for all Array children
          validatedVal[i] = this.childNodes.all.set(value[i]);
        }
      } else {
        for (var index in this.childNodes) {
          // validate each value
          validatedVal[index] = this.childNodes[index].set(value[index]);
        }
      }
    } else {
      validatedVal = {};
      for (var index in this.childNodes) {
        validatedVal[index] = this.childNodes[index].set(value[index]);
      }
    }
  }else{
    validatedVal = value;
  }

  return this.value = validatedVal;
};

Node.prototype.end = function () {
  if (this.parent && true === this.parent.allowChildNodes && this.parent.nodeChildren) {
    return this.parent.nodeChildren;
  }

  return this.parent || this;
};

Node.prototype.children = function () {
  if (true === this.allowChildNodes) {
    if (!this.nodeChildren) {
      this.nodeChildren = new NodeChildren(this);
    }
    return this.nodeChildren;
  } else {
    throw new Error('Node ' + this.name + ' cannot carry any children, only `Object` and `Array` nodes do.');
  }
};

function NodeChildren(parent) {
  this.objectNode = function (name) {
    return new ObjectNode(name, null, parent);
  };

  this.arrayNode = function (name) {
    return new ArrayNode(name, null, parent);
  };

  this.stringNode = function (name) {
    return new StringNode(name, null, parent);
  };

  this.booleanNode = function (name) {
    return new BooleanNode(name, null, parent);
  };

  this.numberNode = function (name) {
    return new NumberNode(name, null, parent);
  };

  this.end = function () {
    return parent;
  };
}

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function NumberNode(name, children, parent) {
  Node.apply(this, [name, new NumberAssert(), children, parent, false]);

  this.greaterThan = function (num) {
    this.asserts.push(new GreaterThan(num));
    return this;
  };

  this.lessThan = function (num) {
    this.asserts.push(new LessThan(num));
    return this;
  };
}

NumberNode.prototype = Object.create(Node.prototype);

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function ObjectNode(name, children, parent) {
  Node.apply(this, [name, new ObjectAssert(), children, parent, true]);
}

ObjectNode.prototype = Object.create(Node.prototype);

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function StringNode(name, children, parent) {
  Node.apply(this, [name, new StringAssert(), children, parent, false]);

  this.greaterThan = function (num) {
    this.asserts.push(new GreaterThan(num));
    return this;
  };

  this.lessThan = function (num) {
    this.asserts.push(new LessThan(num));
    return this;
  };
}

StringNode.prototype = Object.create(Node.prototype);

function configurator(tree) {
  if (tree && Object.prototype.toString.call(tree) === '[object Array]') {
    return new ObjectNode('root', tree, null);
  }

  return new ObjectNode('root', null, null);
}

configurator.StringNode = StringNode;
configurator.NumberNode = NumberNode;
configurator.BooleanNode = BooleanNode;
configurator.ArrayNode = ArrayNode;
configurator.ObjectNode = ObjectNode;

if (typeof define === 'function' && define.amd) {
  define([], configurator);
} else if (typeof exports === 'object') {
  module.exports = configurator;
} else {
  root.configurator = configurator;
}

}(this));
