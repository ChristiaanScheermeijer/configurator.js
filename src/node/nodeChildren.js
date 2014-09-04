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

  this.end = function () {
    return parent;
  };
}