function CountAssert(min, max) {
  this.test = function (node, value) {
    if (typeof min === 'number' && value.length < min) {
      throw new AssertError(node, 'CountAssert', 'Expected array to contain `' + min + '` or more values');
    }

    if (typeof max === 'number' && value.length > max) {
      throw new AssertError(node, 'CountAssert', 'Expected array to contain `' + max + '` or less values');
    }
  };
}