function sharedAssertSpecHelper() {

  describe('asserts', function () {

    describe('greaterThan and lessThan', function () {
      it('should throw a error if a number value is greater than allowed', function () {
        expect(function () {
          config.set({
            property1: 100
          });
        }).toThrowError(/Expected value to be less than 11 but is 100/);
      });

      it('should throw a error if a number value is less than allowed', function () {
        expect(function () {
          config.set({
            property1: 1
          });
        }).toThrowError(/Expected value to be greater than 4 but is 1/);
      });

      it('should be able to set number value if it is between greaterThan and lessThan', function () {
        expect(function () {
          config.set({
            property1: 6
          });
        }).not.toThrow();
      });

      it('should throw a error if string length is greater than allowed', function () {
        expect(function () {
          config.set({
            property1: 5,
            collection: [{
              property1: 'short'
            }]
          });
        }).toThrowError(/Expected value to contain 10 or more characters/);
      });

      it('should throw a error if string length is less than allowed', function () {
        expect(function () {
          config.set({
            property1: 5,
            collection: [{
              property1: 'this is a very long string and is not allowed..'
            }]
          });
        }).toThrowError(/Expected value to contain 20 or less characters/);
      });

      it('should be able to set string if it its length is between greaterThan and lessThan', function () {
        expect(function () {
          config.set({
            property1: 5,
            collection: [{
              property1: 'this is correct'
            }]
          });
        }).not.toThrow();
      });
    });
  });
}