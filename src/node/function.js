/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function FunctionNode(name, children, parent) {
  Node.apply(this, [name, new FunctionAssert(), children, parent, false]);
}

FunctionNode.prototype = Object.create(Node.prototype);