function GreaterThanAssert(greaterThan) {
  this.args = Array.prototype.slice.call(arguments, 0);
  this.test = function (node, value) {
    if (typeof value === 'string' && value.length <= greaterThan) {
      throw new AssertError(node, 'GreaterThanAssert', 'Expected value to contain ' + greaterThan + ' or more characters');
    }

    if (typeof value === 'number' && value <= greaterThan) {
      throw new AssertError(node, 'GreaterThanAssert',
        'Expected value to be greater than ' + greaterThan + ' but is ' + value);
    }

    return true;
  };
}

function LessThanAssert(lessThan) {
  this.test = function (node, value) {
    if (typeof value === 'string' && value.length >= lessThan) {
      throw new AssertError(node, 'LessThanAssert', 'Expected value to contain ' + lessThan + ' or less characters');
    }

    if (typeof value === 'number' && value >= lessThan) {
      throw new AssertError(node, 'LessThanAssert', 'Expected value to be less than ' + lessThan + ' but is ' + value);
    }

    return true;
  };
}

function RegexAssert(expression, expect) {
  var regex = new RegExp(expression);
  var regexResult = expect || true;
  this.test = function (node, value) {
    if (regex.test(value) !== regexResult) {
      throw new AssertError(node, 'RegexAssert', 'Expected value to match regex `' + regex.toString() + '`');
    }
  };
}

function ChoiceAssert(choices) {
  this.test = function (node, value) {
    if (choices && -1 === choices.indexOf(value)) {
      throw new AssertError(node, 'ChoiceAssert', 'Given value is not a valid choice, choose from [' + choices.join(',') + ']');
    }
  };
}

function NotEmptyAssert() {
  this.test = function (node, value) {
    if ('' === value) {
      throw new AssertError(node, 'NotEmptyAssert', 'Expect value not to be blank');
    }
  };
}