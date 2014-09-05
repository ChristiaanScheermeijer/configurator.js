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

Node.prototype.default = function(val) {
  this.defaultValue = val;
  return this;
};

Node.prototype.regex = function(expr, expects) {
  this.asserts.push(new RegexAssert(expr, expects));
};

Node.prototype.getLongname = function () {
  var name = [this.name], prev = this;

  while(!!(prev = prev.parent)) {
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
    }else{
      return this.value;
    }
  }

  for (i = 0; i < this.asserts.length; i++) {
    this.asserts[i].test(this, value);
  }

  if (true === this.allowChildNodes) {
    // validate ArrayNodes
    if (this instanceof ArrayNode) {
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
    } else {
      validatedVal = {};
      for (index in this.childNodes) {
        validatedVal[index] = this.childNodes[index].set(value[index]);
      }
    }
  }else{
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