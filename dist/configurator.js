(function(root, undefined) {

  'use strict';


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

utils.isDate = function (value) {
  return toString(value) === '[object Date]';
};

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
    if (utils.isArray(value)) {
      if (utils.isNumber(min) && value.length < min) {
        throw new AssertError(node, 'CountAssert', 'Expected array to contain ' + min + ' or more values');
      }

      if (utils.isNumber(max) && value.length > max) {
        throw new AssertError(node, 'CountAssert', 'Expected array to contain ' + max + ' or less values');
      }
    }
  };
}

function GreaterThanAssert(greaterThan) {
  this.args = Array.prototype.slice.call(arguments, 0);
  this.test = function (node, value) {
    if (utils.isString(value) && value.length <= greaterThan) {
      throw new AssertError(node, 'GreaterThanAssert',
        'Expected value to contain ' + greaterThan + ' or more characters');
    }

    if (utils.isNumber(value) && value <= greaterThan) {
      throw new AssertError(node, 'GreaterThanAssert',
        'Expected value to be greater than ' + greaterThan + ' but is ' + value);
    }

    return true;
  };
}

function LessThanAssert(lessThan) {
  this.test = function (node, value) {
    if (utils.isString(value) && value.length >= lessThan) {
      throw new AssertError(node, 'LessThanAssert', 'Expected value to contain ' + lessThan + ' or less characters');
    }

    if (utils.isNumber(value) && value >= lessThan) {
      throw new AssertError(node, 'LessThanAssert', 'Expected value to be less than ' + lessThan + ' but is ' + value);
    }

    return true;
  };
}

function RegexAssert(expression, expect) {
  var regex;
  if (utils.isRegexp(expression)) {
    regex = expression;
  } else if (utils.isString(expression)) {
    regex = new RegExp(expression);
  }

  var regexResult = expect || true;
  this.test = function (node, value) {
    // reset lastIndex due to regex bug with global flag
    regex.lastIndex = 0;

    if (true === utils.isString(value) || true === utils.isNumber(value)) {
      if (true === utils.isRegexp(regex)) {
        if (regex.test(value) !== regexResult) {
          throw new AssertError(node, 'RegexAssert', 'Expected value to match regex `' + regex.toString() + '`');
        }
      } else {
        throw new AssertError(node, 'WrongRegexAssert', 'Regex not valid');
      }
    }
  };
}

function ChoiceAssert(choices) {
  this.test = function (node, value) {
    if (utils.isArray(choices) && -1 === choices.indexOf(value)) {
      throw new AssertError(node, 'ChoiceAssert',
        'Given value is not a valid choice, choose from [' + choices.join(',') + ']');
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

function StringTypeAssert() {
  this.test = function (node, value) {
    if (false === utils.isString(value)) {
      throw new AssertError(node, 'String', 'type mismatch expected `[object String]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function NumberTypeAssert() {
  this.test = function (node, value) {
    if (false === utils.isNumber(value)) {
      throw new AssertError(node, 'Number', 'type mismatch expected `[object Number]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function BooleanTypeAssert() {
  this.test = function (node, value) {
    if (false === utils.isBoolean(value)) {
      throw new AssertError(node, 'Boolean', 'type mismatch expected `[object Boolean]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function ObjectTypeAssert() {
  this.test = function (node, value) {
    if (false === utils.isObject(value)) {
      throw new AssertError(node, 'Object', 'type mismatch expected `[object Object]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function ArrayTypeAssert() {
  this.test = function (node, value) {
    if (false === utils.isArray(value)) {
      throw new AssertError(node, 'Array', 'type mismatch expected `[object Array]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function FunctionTypeAssert() {
  this.test = function (node, value) {
    if (false === utils.isFunction(value)) {
      throw new AssertError(node, 'Function', 'type mismatch expected `[object Function]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function RegexTypeAssert() {
  this.test = function (node, value) {
    if (false === utils.isRegexp(value)) {
      throw new AssertError(node, 'Regex', 'type mismatch expected `[object Regexp]` got `' + utils.callToString(value) + '`');
    }
    return true;
  };
}

function DateTypeAssert() {
  this.test = function (node, value) {
    if (false === utils.isDate(value)) {
      throw new AssertError(node, 'Date', 'type mismatch expected `[object Date]` got `' + utils.callToString(value) + '`');
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
  this.childNodesAll = null;
  this.nodeChildren = null;
  this.allowChildNodes = allowChildNodes || false;
  this.asserts = assert ? [assert] : [];
  this.defaultValue = undefined;
  this.value = undefined;
  this.modifiers = [];

  // for the argument tree builder
  if (true === this.allowChildNodes && true === utils.isArray(children)) {
    if (children.length === 1 && children[0].name === 'all') {
      this.childNodesAll = children[0];
      this.childNodesAll.parent = this;
    }else{
      for (var i = 0; i < children.length; i++) {
        children[i].parent = this;
        this.childNodes[children[i].name] = children[i];
      }
    }
  }

  // for the method tree builder
  if (parent && parent.childNodes) {
    if (this.name === 'all') {
      parent.childNodesAll = this;
    }else{
      parent.childNodes[name] = this;
    }
  }
}

Node.prototype.get = function () {
  return this.value;
};

Node.prototype.set = function (val) {
  this.value = this.validate(val);
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

Node.prototype.getLongname = function () {
  var name = [this.name], prev = this;

  while (!!(prev = prev.parent)) {
    if (prev.name !== 'root') {
      name.push(prev.name);
    }
  }

  return 'root[' + name.reverse().join('][') + ']';
};

Node.prototype.addModifier = function (modifier) {
  if (typeof modifier === 'function') {
      this.modifiers.push(modifier);
  }

  return this;
};

Node.prototype.validate = function (value) {
  var validatedVal, index, i;

  if (typeof value === 'undefined') {
    if (true === this.isRequired) {
      throw new Error('Node `' + this.getLongname() + '` is required.');
    }

    if (typeof this.defaultValue !== 'undefined') {
      value = this.defaultValue;
    } else {
      return undefined;
    }
  }

  for (i = 0; i < this.asserts.length; i++) {
    this.asserts[i].test(this, value);
  }

  if (true === this.allowChildNodes && true === utils.isArray(value)) {
    // validate ArrayNode or MixedNode
    validatedVal = [];
    if (this.childNodesAll) {
      for (i = 0; i < value.length; i++) {
        // validate same validator for all Array children
        var clone = this.childNodesAll.clone();
        validatedVal[i] = clone.set(value[i]);
      }
    } else {
      for (index in this.childNodes) {
        // validate each value
        validatedVal[index] = this.childNodes[index].set(value[index]);
      }
    }
  } else if (true === this.allowChildNodes && true === utils.isObject(value)) {
    // validate ObjectNode or MixedNode
    validatedVal = {};

    if (this.childNodesAll) {
      for (index in value) {
        // validate same validator for all Object children
        validatedVal[index] = this.childNodesAll.clone().set(value[index]);
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

  if (this.modifiers.length > 0 && this.defaultValue != validatedVal) {
    for (var mi = 0; mi < this.modifiers.length; mi++) {
      validatedVal = this.modifiers[mi].call(this, validatedVal);
    }
  }

  return validatedVal;
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
    throw new Error('Node ' + this.name + ' cannot carry any children, only `Object`, `Array` and `Mixed` nodes do.');
  }
};

Node.prototype.clone = function () {
  var clone = new this.constructor('clone', [], null);
  clone.parent = this.parent;
  clone.asserts = this.asserts;
  clone.childNodesAll = this.childNodesAll;
  clone.defaultValue = this.defaultValue;
  clone.isRequired = this.isRequired;
  clone.modifiers = this.modifiers;
  clone.allowChildNodes = this.allowChildNodes;

  for(var index in this.childNodes) {
    clone.childNodes[index] = this.childNodes[index].clone();
  }

  return clone;
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
  Node.apply(this, [name, new ArrayTypeAssert(), children, parent, true]);

  this.count = function (min, max) {
    this.asserts.push(new CountAssert(min, max));
    return this;
  };
}

ArrayNode.prototype = Object.create(Node.prototype);
ArrayNode.prototype.constructor = ArrayNode;

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function BooleanNode(name, children, parent) {
  Node.apply(this, [name, new BooleanTypeAssert(), children, parent, false]);
}

BooleanNode.prototype = Object.create(Node.prototype);
BooleanNode.prototype.constructor = BooleanNode;

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function DateNode(name, children, parent) {
  Node.apply(this, [name, new DateTypeAssert(), children, parent, true]);
}

DateNode.prototype = Object.create(Node.prototype);
DateNode.prototype.constructor = DateNode;

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function FunctionNode(name, children, parent) {
  Node.apply(this, [name, new FunctionTypeAssert(), children, parent, false]);
}

FunctionNode.prototype = Object.create(Node.prototype);
FunctionNode.prototype.constructor = FunctionNode;

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

  this.regex = function (expr, expects) {
    this.asserts.push(new RegexAssert(expr, expects));
    return this;
  };
}

MixedNode.prototype = Object.create(Node.prototype);
MixedNode.prototype.constructor = MixedNode;

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

  this.regexNode = function (name) {
    return new RegexNode(name, null, parent);
  };

  this.dateNode = function (name) {
    return new DateNode(name, null, parent);
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
  Node.apply(this, [name, new NumberTypeAssert(), children, parent, false]);

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

  this.regex = function (expr, expects) {
    this.asserts.push(new RegexAssert(expr, expects));
    return this;
  };
}

NumberNode.prototype = Object.create(Node.prototype);
NumberNode.prototype.constructor = NumberNode;

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function ObjectNode(name, children, parent) {
  Node.apply(this, [name, new ObjectTypeAssert(), children, parent, true]);
}

ObjectNode.prototype = Object.create(Node.prototype);
ObjectNode.prototype.constructor = ObjectNode;

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function RegexNode(name, children, parent) {
  Node.apply(this, [name, new RegexTypeAssert(), children, parent, true]);
}

RegexNode.prototype = Object.create(Node.prototype);
RegexNode.prototype.constructor = RegexNode;

/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function StringNode(name, children, parent) {
  Node.apply(this, [name, new StringTypeAssert(), children, parent, false]);

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

  this.regex = function (expr, expects) {
    this.asserts.push(new RegexAssert(expr, expects));
    return this;
  };
}

StringNode.prototype = Object.create(Node.prototype);
StringNode.prototype.constructor = StringNode;

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
configurator.RegexNode = RegexNode;
configurator.DateNode = DateNode;

if (typeof define === 'function' && define.amd) {
  define([], function () {
    return configurator;
  });
} else if (typeof exports === 'object') {
  module.exports = configurator;
} else {
  root.configurator = configurator;
}

}(this));
