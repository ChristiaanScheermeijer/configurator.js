/**
 * @param name
 * @param [children]
 * @param [parent]
 *
 * @implements Node
 * @constructor
 */
function MixedNode(name, children, parent) {
  Node.apply(this, [name, null, children, parent, true]);
}

MixedNode.prototype = Object.create(Node.prototype);