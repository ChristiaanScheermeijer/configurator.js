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
  this.message = 'AssertError for ' + node.getLongname() + ': ' + message;
}

AssertError.prototype = Object.create(Error.prototype);