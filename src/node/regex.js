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

  this.regex = null;
}

RegexNode.prototype = Object.create(Node.prototype);