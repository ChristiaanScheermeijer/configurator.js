/**
 * Main configurator function
 *
 * @param [tree]
 * @returns {ObjectNode}
 */
function configurator(tree) {
  if (tree && Object.prototype.toString.call(tree) === '[object Array]') {
    return new ObjectNode('root', tree, null);
  }

  return new ObjectNode('root', null, null);
}

configurator.StringNode = StringNode;
configurator.NumberNode = NumberNode;
configurator.BooleanNode = BooleanNode;
configurator.ArrayNode = ArrayNode;
configurator.ObjectNode = ObjectNode;
configurator.MixedNode = MixedNode;
configurator.FunctionNode = FunctionNode;
configurator.RegexNode = RegexNode;