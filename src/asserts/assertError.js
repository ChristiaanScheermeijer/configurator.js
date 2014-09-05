/**
 * @param node
 * @param message
 *
 * @implements Error
 * @constructor
 */
function AssertError(node, assert, message) {
  Error.apply(this, [message]);

  this.node = node;
  this.name = 'AssertError';
  this.assert = assert;
  this.message = node.getLongname() + ': ' + message;
}

AssertError.prototype = Object.create(Error.prototype);