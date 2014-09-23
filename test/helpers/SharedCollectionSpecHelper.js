function sharedCollectionSpecHelper() {

  describe('collections', function () {

    it('should allow collection with correct types', function () {
      expect(function () {
        config.set({
          property1: 5,
          collection: [
            {
              property1: 'string with some',
              property2: 'anotherstring'
            },
            {
              property1: 'string with some',
              property2: 'anotherstringsecond'
            }
          ]
        });
      }).not.toThrow();
    });

    it('should throw a error when a collection item has wrong values', function () {
      expect(function () {
        config.set({
          property1: 5,
          collection: [
            {
              property1: 'string with some',
              property2: 'anotherstring'
            },
            {
              property1: 'string with some',
              property2: false
            }
          ]
        });
      }).toThrowError(/type mismatch expected `\[object String\]` got `\[object Boolean\]`/);
    });
  });
}