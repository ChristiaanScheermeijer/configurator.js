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

  this.regex = function (regex, expected) {
    this.asserts.push(new RegexAssert(regex, expected));
    return this;
  };

  this.choice = function (choices) {
    this.asserts.push(new ChoiceAssert(choices));
    return this;
  };
}

NumberNode.prototype = Object.create(Node.prototype);