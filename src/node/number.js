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