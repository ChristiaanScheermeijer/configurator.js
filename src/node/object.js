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