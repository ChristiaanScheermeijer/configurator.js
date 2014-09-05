# configurator.js ![Build status](https://travis-ci.org/ChristiaanScheermeijer/configurator.js.svg)

A config tree builder for Javascript

## About

Easily create config tree validators to define your expected config object and don't worry about wrong values anymore.

## Installation

### Bower

To install configurator.js with Bower use the following command.

```bash
$ bower install configurator.js
```

## Usage

There are two ways of creating a config tree. I differentiate them by calling them the `argument` or `method` way.

### Argument tree builder

The argument tree builder uses `Node` instances. The first argument is the name of the property and the second is the
children array. Only `Array`, `Object` and `Mixed` nodes are allowed to have children.

The assertions are exposed as methods for each `Node`.

```js
var config = configurator([
  new configurator.NumberNode('property1').required().greaterThan(4).lessThan(11),
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
  ])
]);
```

### Method tree

To start the method tree builder call the `configurator` function without any aruments and a `ObjectNode` instance
(named root) will be returned.

To add children to a property call the `.children()` method on the `Object`, `Array` or `Mixed` node.

```js
var config = configurator()
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
  .end();
```

### Set and validate

To set and validate a plain Javascript object use the `.set()` method. This will throw Error if the given object doesn't
meet the tree requirements and assertions.

```js
try {
  config.set({
    property1: 5,
    nested: {
      property1: true
    },
    collection: [{
      property1: 'string',
      property2: 'string'
    },{
      property1: 'string',
      property2: 'string'
    }],
    array: [true, false, false]
  });
}catch(e){
  console.log(e.node);
  console.log(e.message);
}
```

### Get config

To get the validated (and filled with defaults) config object use the `.get()` method.

```js
var plainConfiguration = config.get();
```

## TODO

 - add more assertions
 - improve get logics or change it (maybe add property string) i.e. `.get('nested.property1')`

comments or suggestions please send me a PM!