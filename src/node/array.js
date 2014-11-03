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