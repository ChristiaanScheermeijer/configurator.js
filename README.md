# configurator.js

![Build status](https://travis-ci.org/ChristiaanScheermeijer/configurator.js.svg) [![Coverage Status](https://img.shields.io/coveralls/ChristiaanScheermeijer/configurator.js.svg)](https://coveralls.io/r/ChristiaanScheermeijer/configurator.js?branch=master) [![NPM version](https://badge.fury.io/js/configurator.js.svg)](http://badge.fury.io/js/configurator.js) [![Bower version](https://badge.fury.io/bo/configurator.js.svg)](http://badge.fury.io/bo/configurator.js)

A config tree builder for Javascript

## About

Easily create config tree validators to define your expected config object and don't worry about wrong values anymore.

## Installation

### Bower

To install configurator.js with Bower run:

```bash
$ bower install configurator.js
```

### NPM

To install configurator.js with NPM run:

```bash
$ npm install configurator.js
```

## Usage

There are two ways of creating a config tree. I differentiate that by the `argument` or `method` way.
Both methods will return the same result.

### But first include

#### HTML/Javascript

```html
<script type="text/javascript" src="components/configurator.js/dist/configurator.min.js"></script>
```

#### NodeJS

```js
var configurator = require('configurator.js');
```

### Argument tree builder

The argument tree builder uses `Node` instances for each property. The first argument of each `Node` is the name of the
property and the second is the children array. Only `Array`, `Object` and `Mixed` nodes are allowed to have children.

The assertions are exposed as methods for each `Node`.

Start the configurator by calling the global `configurator` function and pass a array of children.

```js
var config = configurator([
  new configurator.NumberNode('property1').required().greaterThan(4).lessThan(11),
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
  ])
]);
```

The object will look like (example values):

```js
var plainConfig = {
  property1: 5,
  property2: "defaultString",
  nested: {
    property1: false,
    property2: "string"
  },
  collection: [{
    property1: "A example string",
    property2: "string"
  }],
  array: [true, false, true]
};
```

### Method tree

To start the method tree builder call the `configurator` function without any aruments and a `ObjectNode` instance
(named root) will be returned.

To add children to a property call the `.children()` method on the `Object`, `Array` or `Mixed` node.

```js
var config = configurator()
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

### Available Nodes and Asserts

#### StringNode
  - required()
  - addModifier(callback)
  - regex(expression)
  - greaterThan(chars)
  - lessThan(chars)
  - choice(choices)
  - notEmpty()

#### NumberNode
  - required()
  - addModifier(callback)
  - regex(expression)
  - greaterThan(num)
  - lessThan(num)
  - choice(choices)

#### BooleanNode
  - required()
  - addModifier(callback)

#### ObjectNode
  - required()
  - addModifier(callback)

#### ArrayNode
  - required()
  - addModifier(callback)
  - count(min, max)

#### MixedNode
  - required()
  - addModifier(callback)
  - regex(expression)
  - greaterThan(chars)
  - lessThan(chars)
  - choice(choices)
  - notEmpty()

#### FunctionNode
  - required()
  - addModifier(callback)

#### RegexNode
  - required()
  - addModifier(callback)

### Single parameter validation

It also possible to create a validator for a single parameter instead using a root object.

```js
var gender = new configurator.StringNode('root').choice(['male', 'female']);

gender.set('male');
gender.get(); // male

gender.set('not a gender'); // throws AssertError
```

## Changelog

### Develop

  - fixed issue where NumberNode doesn't accept 0
  - fixed issue where RegexNode fails with /g flag
  - added Node modifiers

### 0.1.1

  - fixed issue #1
  - fixed issue #2
  - regex assert only for String, Number and Mixed nodes
  - added utils
  - added RegexNode
  - added DateNode

### 0.1.0

  - added FunctionNode
  - added to NPM registry
  - updated README

### 0.0.2a

  - added MixedNode
  - added ChoiceAssert
  - added NotEmptyAssert
  - added CountAssert

### 0.0.1a

  - initial commit

## TODO

 - add more assertions
 - add option to not throw errors
 - add option to not fail on a single error and continue validating (even set validated values?)
 - improve get logics or change it (maybe add property string) i.e. `.get('nested.property1')`

comments and/or suggestions are welcome!