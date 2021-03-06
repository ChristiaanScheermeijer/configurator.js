var config;

function methodConfigHelper() {
  beforeEach(function () {
    config = configurator()
      .children()
        .numberNode('property1').required().greaterThan(4).lessThan(11).end()
        .stringNode('property2').setDefault('defaultString').end()
        .objectNode('nested')
          .children()
            .booleanNode('property1').required().end()
            .stringNode('property2').end()
          .end()
        .end()
        .arrayNode('collection')
          .children()
            .objectNode('all')
              .children()
                .stringNode('property1').greaterThan(10).lessThan(20).end()
                .stringNode('property2').end()
              .end()
            .end()
          .end()
        .end()
        .arrayNode('array')
          .children()
            .booleanNode('all').end()
          .end()
        .end()
        .mixedNode('mixed').end()
        .mixedNode('mixedWithChildren')
          .children()
            .stringNode('all').end()
          .end()
        .end()
        .stringNode('email').regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).end()
        .stringNode('gender').choice(['male', 'female']).end()
        .stringNode('country').notEmpty().end()
        .numberNode('subscribe').choice([0, 1]).end()
        .mixedNode('mixedNodeWithAssert').greaterThan(0).lessThan(10).end()
        .mixedNode('mixedNode').choice([true, 'string', 5]).end()
        .mixedNode('mixedNodeNotEmpty').notEmpty().end()
        .arrayNode('arrayCount').count(1, 10).end()
        .functionNode('callback').end()
      .end();
  });

  afterEach(function () {
    config = null;
  });
}

function argConfigHelper() {
  beforeEach(function () {
    config = configurator([
      new configurator.NumberNode('property1').greaterThan(4).lessThan(11).required(),
      new configurator.StringNode('property2').setDefault('defaultString'),
      new configurator.ObjectNode('nested', [
        new configurator.BooleanNode('property1').required(),
        new configurator.StringNode('property2')
      ]),
      new configurator.ArrayNode('collection', [
        new configurator.ObjectNode('all', [
          new configurator.StringNode('property1').greaterThan(10).lessThan(20),
          new configurator.StringNode('property2')
        ])
      ]),
      new configurator.ArrayNode('array', [
        new configurator.BooleanNode('all')
      ]),
      new configurator.MixedNode('mixed'),
      new configurator.MixedNode('mixedWithChildren', [
        new configurator.StringNode('all')
      ]),
      new configurator.StringNode('email').regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
      new configurator.StringNode('gender').choice(['male', 'female']),
      new configurator.StringNode('country').notEmpty(),
      new configurator.NumberNode('subscribe').choice([0, 1]),
      new configurator.MixedNode('mixedNodeWithAssert').greaterThan(0).lessThan(10),
      new configurator.MixedNode('mixedNode').choice([true, 'string', 5]),
      new configurator.MixedNode('mixedNodeNotEmpty').notEmpty(),
      new configurator.ArrayNode('arrayCount').count(1, 10),
      new configurator.FunctionNode('callback')
    ]);
  });

  afterEach(function () {
    config = null;
  });
}