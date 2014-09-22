/**
 * @param parent
 * @constructor
 */
function NodeChildren(parent) {
  this.objectNode = function (name) {
    return new ObjectNode(name, null, parent);
  };

  this.arrayNode = function (name) {
    return new ArrayNode(name, null, parent);
  };

  this.stringNode = function (name) {
    return new StringNode(name, null, parent);
  };

  this.booleanNode = function (name) {
    return new BooleanNode(name, null, parent);
  };

  this.numberNode = function (name) {
    return new NumberNode(name, null, parent);
  };

  this.mixedNode = function (name) {
    return new MixedNode(name, null, parent);
  };

  this.functionNode = function (name) {
    return new FunctionNode(name, null, parent);
  };

  this.regexNode = function (name) {
    return new RegexNode(name, null, parent);
  };

  this.end = function () {
    return parent;
  };
}