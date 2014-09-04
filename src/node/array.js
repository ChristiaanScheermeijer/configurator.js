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