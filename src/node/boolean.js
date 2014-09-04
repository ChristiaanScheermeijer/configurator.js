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