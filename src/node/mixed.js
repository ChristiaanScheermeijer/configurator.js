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