function GreaterThanAssert(greaterThan) {
  this.args = Array.prototype.slice.call(arguments, 0);
  this.test = function (node, value) {
    if (utils.isString(value) && value.length <= greaterThan) {
      throw new AssertError(node, 'GreaterThanAssert',
        'Expected value to contain ' + greaterThan + ' or more characters');
    }

    if (utils.isNumber(value) && value <= greaterThan) {
      throw new AssertError(node, 'GreaterThanAssert',
        'Expected value to be greater than ' + greaterThan + ' but is ' + value);
    }

    return true;
  };
}

function LessThanAssert(lessThan) {
  this.test = function (node, value) {
    if (utils.isString(value) && value.length >= lessThan) {
      throw new AssertError(node, 'LessThanAssert', 'Expected value to contain ' + lessThan + ' or less characters');
    }

    if (utils.isNumber(value) && value >= lessThan) {
      throw new AssertError(node, 'LessThanAssert', 'Expected value to be less than ' + lessThan + ' but is ' + value);
    }

    return true;
  };
}

function RegexAssert(expression, expect) {
  var regex;
  if (utils.isRegexp(expression)) {
    regex = expression;
  } else if (utils.isString(expression)) {
    regex = new RegExp(expression);
  }
  var regexResult = expect || true;
  this.test = function (node, value) {
    if (true === utils.isString(value) || true === utils.isNumber(value)) {
      if (true === utils.isRegexp(regex)) {
        if (regex.test(value) !== regexResult) {
          throw new AssertError(node, 'RegexAssert', 'Expected value to match regex `' + regex.toString() + '`');
        }
      } else {
        throw new AssertError(node, 'WrongRegexAssert', 'Regex not valid');
      }
    }
  };
}

function ChoiceAssert(choices) {
  this.test = function (node, value) {
    if (utils.isArray(choices) && -1 === choices.indexOf(value)) {
      throw new AssertError(node, 'ChoiceAssert',
        'Given value is not a valid choice, choose from [' + choices.join(',') + ']');
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