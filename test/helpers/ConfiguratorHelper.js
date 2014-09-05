var config;

function methodConfigHelper() {
  beforeEach(function () {
    config = configurator()
      .children()
        .numberNode('property1').required().greaterThan(4).lessThan(11).end()
        .stringNode('property2').default('defaultString').end()
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
      new configurator.StringNode('property2').default('defaultString'),
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
      ])
    ]);
  });

  afterEach(function () {
    config = null;
  });
}