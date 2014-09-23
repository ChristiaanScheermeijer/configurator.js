function CountAssert(min, max) {
  this.test = function (node, value) {
    if (utils.isArray(value)) {
      if (utils.isNumber(min) && value.length < min) {
        throw new AssertError(node, 'CountAssert', 'Expected array to contain ' + min + ' or more values');
      }

      if (utils.isNumber(max) && value.length > max) {
        throw new AssertError(node, 'CountAssert', 'Expected array to contain ' + max + ' or less values');
      }
    }
  };
}