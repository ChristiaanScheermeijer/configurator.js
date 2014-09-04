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