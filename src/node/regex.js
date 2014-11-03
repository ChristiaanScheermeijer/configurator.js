/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function RegexNode(name, children, parent) {
  Node.apply(this, [name, new RegexTypeAssert(), children, parent, true]);
}

RegexNode.prototype = Object.create(Node.prototype);
RegexNode.prototype.constructor = RegexNode;