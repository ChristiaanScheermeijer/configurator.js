# configurator.js [![Build status](https://travis-ci.org/ChristiaanScheermeijer/configurator.js.svg)]

A config tree builder for Javascript

## About

more to come

## Installation

more to come

## Usage

```js
var config = configurator([
  new configurator.NumberNode('property1').required(),
  new configurator.StringNode('property2').default('defaultString'),
  new configurator.ObjectNode('nested', [
    new configurator.BooleanNode('property1').required(),
    new configurator.StringNode('property2')
  ]),
  new configurator.ArrayNode('collection', [
    new configurator.ObjectNode('all', [
      new configurator.StringNode('property1'),
      new configurator.StringNode('property2')
    ])
  ]),
  new configurator.ArrayNode('array', [
    new configurator.BooleanNode('all')
  ])
]);

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
```

t2.set({
property1: 'string',
property2: 'anotherstring'
});