(function(root, undefined) {

  'use strict';


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
  this.message = node.getLongname() + ': ' + message;
}

AssertError.prototype = Object.create(Error.prototype);

function CountAssert(min, max) {
  this.test = function (node, value) {
    if (typeof min === 'number' && value.length < min) {
      throw new AssertError(node, 'CountAssert', 'Expected array to contain ' + min + ' or more values');
    }

    if (typeof max === 'number' && value.length > max) {
      throw new AssertError(node, 'CountAssert', 'Expected array to contain ' + max + ' or less values');
    }
  };
}

function GreaterThanAssert(greaterThan) {
  this.args = Array.prototype.slice.call(arguments, 0);
  this.test = function (node, value) {
    if (typeof value === 'string' && value.length <= greaterThan) {
      throw new AssertError(node, 'GreaterThanAssert', 'Expected value to contain ' + greaterThan + ' or more characters');
    }

    if (typeof value === 'number' && value <= greaterThan) {
      throw new AssertError(node, 'GreaterThanAssert',
        'Expected value to be greater than ' + greaterThan + ' but is ' + value);
    }

    return true;
  };
}

function LessThanAssert(lessThan) {
  this.test = function (node, value) {
    if (typeof value === 'string' && value.length >= lessThan) {
      throw new AssertError(node, 'LessThanAssert', 'Expected value to contain ' + lessThan + ' or less characters');
    }

    if (typeof value === 'number' && value >= lessThan) {
      throw new AssertError(node, 'LessThanAssert', 'Expected value to be less than ' + lessThan + ' but is ' + value);
    }

    return true;
  };
}

function RegexAssert(expression, expect) {
  var regex = new RegExp(expression);
  var regexResult = expect || true;
  this.test = function (node, value) {
    if (regex.test(value) !== regexResult) {
      throw new AssertError(node, 'RegexAssert', 'Expected value to match regex `' + regex.toString() + '`');
    }
  };
}

function ChoiceAssert(choices) {
  this.test = function (node, value) {
    if (choices && -1 === choices.indexOf(value)) {
      throw new AssertError(node, 'ChoiceAssert', 'Given value is not a valid choise, choose from [' + choices.join(',') + ']');
    }
  };
}

function NotEmptyAssert() {
  this.test = function (node, value) {
    if ('' === value) {
      throw new AssertError(node, 'NotEmptyAssert', 'Expect value not to be blank');
    }
  };
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

function FunctionAssert() {
  this.test = function (node, value) {
    if (typeof value !== 'function') {
      throw new AssertError(node, 'Function', 'type mismatch expected `function` got `' + typeof value + '`');
    }
    return true;
  };
}

/**
 * @constructor
 */
function Node(name, assert, children, parent, allowChildNodes) {
  this.name = name;
  this.parent = parent;
  this.isRequired = false;
  this.childNodes = {};
  this.nodeChildren = null;
  this.allowChildNodes = allowChildNodes || false;
  this.asserts = assert ? [assert] : [];
  this.defaultValue = null;
  this.value = undefined;

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
  this.validate(val);
  return this.value;
};

Node.prototype.required = function () {
  this.isRequired = true;
  return this;
};

Node.prototype.setDefault = function (val) {
  this.defaultValue = val;
  return this;
};

Node.prototype.regex = function (expr, expects) {
  this.asserts.push(new RegexAssert(expr, expects));
  return this;
};

Node.prototype.getLongname = function () {
  var name = [this.name], prev = this;

  while (!!(prev = prev.parent)) {
    if (prev.name !== 'root') {
      name.push(prev.name);
    }
  }

  return 'root[' + name.reverse().join('][') + ']';
};

Node.prototype.validate = function (value) {
  var validatedVal, index, i;

  if (typeof value === 'undefined') {
    if (true === this.isRequired) {
      throw new Error('Node `' + this.getLongname() + '` is required.');
    }

    if (this.defaultValue) {
      value = this.defaultValue;
    } else {
      return this.value;
    }
  }

  for (i = 0; i < this.asserts.length; i++) {
    this.asserts[i].test(this, value);
  }

  if (true === this.allowChildNodes && '[object Array]' === Object.prototype.toString.call(value)) {
    // validate ArrayNode or MixedNode
    validatedVal = [];
    if (this.childNodes && this.childNodes.all) {
      for (i = 0; i < value.length; i++) {
        // validate same validator for all Array children
        validatedVal[i] = this.childNodes.all.set(value[i]);
      }
    } else {
      for (index in this.childNodes) {
        // validate each value
        validatedVal[index] = this.childNodes[index].set(value[index]);
      }
    }
  } else if (true === this.allowChildNodes && '[object Object]' === Object.prototype.toString.call(value)) {
    // validate ObjectNode or MixedNode
    validatedVal = {};

    if (this.childNodes && this.childNodes.all) {
      for (index in value) {
        // validate same validator for all Object children
        validatedVal[index] = this.childNodes.all.set(value[index]);
      }
    } else {
      for (index in this.childNodes) {
        validatedVal[index] = this.childNodes[index].set(value[index]);
      }
    }
  } else {
    // validate StringNode, NumberNode, BooleanNode or MixedNode
    validatedVal = value;
  }

  this.value = validatedVal;
  return this.value;
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

  this.count = function (min, max) {
    this.asserts.push(new CountAssert(min, max));
    return this;
  };
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
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function FunctionNode(name, children, parent) {
  Node.apply(this, [name, new FunctionAssert(), children, parent, false]);
}

FunctionNode.prototype = Object.create(Node.prototype);

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function MixedNode(name, children, parent) {
  Node.apply(this, [name, null, children, parent, true]);

  this.greaterThan = function (num) {
    this.asserts.push(new GreaterThanAssert(num));
    return this;
  };

  this.lessThan = function (num) {
    this.asserts.push(new LessThanAssert(num));
    return this;
  };

  this.choice = function (choices) {
    this.asserts.push(new ChoiceAssert(choices));
    return this;
  };

  this.notEmpty = function () {
    this.asserts.push(new NotEmptyAssert());
    return this;
  };
}

MixedNode.prototype = Object.create(Node.prototype);

/**
 * @param parent
 * @constructor
 */
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

  this.mixedNode = function (name) {
    return new MixedNode(name, null, parent);
  };

  this.functionNode = function (name) {
    return new FunctionNode(name, null, parent);
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
    this.asserts.push(new GreaterThanAssert(num));
    return this;
  };

  this.lessThan = function (num) {
    this.asserts.push(new LessThanAssert(num));
    return this;
  };

  this.choice = function (choices) {
    this.asserts.push(new ChoiceAssert(choices));
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
    this.asserts.push(new GreaterThanAssert(num));
    return this;
  };

  this.lessThan = function (num) {
    this.asserts.push(new LessThanAssert(num));
    return this;
  };

  this.choice = function (choices) {
    this.asserts.push(new ChoiceAssert(choices));
    return this;
  };

  this.notEmpty = function () {
    this.asserts.push(new NotEmptyAssert());
    return this;
  };
}

StringNode.prototype = Object.create(Node.prototype);

/**
 * Main configurator function
 *
 * @param [tree]
 * @returns {ObjectNode}
 */
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
configurator.MixedNode = MixedNode;
configurator.FunctionNode = FunctionNode;

if (typeof define === 'function' && define.amd) {
  define([], configurator);
} else if (typeof exports === 'object') {
  module.exports = configurator;
}else{
  root.configurator = configurator;
}

}(this));
