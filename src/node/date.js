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