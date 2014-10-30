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
            collection: [
              {
                property1: 'short'
              }
            ]
          });
        }).toThrowError(/Expected value to contain 10 or more characters/);
      });

      it('should throw a error if string length is less than allowed', function () {
        expect(function () {
          config.set({
            property1: 5,
            collection: [
              {
                property1: 'this is a very long string and is not allowed..'
              }
            ]
          });
        }).toThrowError(/Expected value to contain 20 or less characters/);
      });

      it('should be able to set string if it its length is between greaterThan and lessThan', function () {
        expect(function () {
          config.set({
            property1: 5,
            collection: [
              {
                property1: 'this is correct'
              }
            ]
          });
        }).not.toThrow();
      });
    });

    describe('regex', function () {
      it('should be able to set a valid value tested by a custom regex', function () {
        expect(function () {
          config.set({
            property1: 5,
            email: 'email@address.com'
          });
        }).not.toThrow();
      });

      it('should throw a error when a value does not match a regex', function () {
        expect(function () {
          config.set({
            property1: 5,
            email: 'emailaddrescom'
          });
        }).toThrowError(/Expected value to match regex/);
      });
    });

    describe('choice', function () {
      it('should allow a valid choice', function () {
        expect(function () {
          config.set({
            property1: 5,
            gender: 'male',
            subscribe: 0
          });
        }).not.toThrow();
      });

      it('should throw a error when the choice is invalid', function () {
        expect(function () {
          config.set({
            property1: 5,
            gender: 'notagender'
          });
        }).toThrowError(/Given value is not a valid choice, choose from/);

        expect(function () {
          config.set({
            property1: 5,
            subscribe: 3
          });
        }).toThrowError(/Given value is not a valid choice, choose from/);
      });
    });

    describe('notEmpty', function () {
      it('should allow a not empty value', function () {
        expect(function () {
          config.set({
            property1: 5,
            country: 'Netherlands'
          });
        }).not.toThrow();
      });

      it('should throw a error when the value is empty', function () {
        expect(function () {
          config.set({
            property1: 5,
            country: ''
          });
        }).toThrowError(/Expect value not to be blank/);
      });
    });

    describe('count', function () {
      it('should pass if the count is between min and max', function () {
        expect(function () {
          config.set({
            property1: 5,
            arrayCount: ['asd', 'asd']
          });
        }).not.toThrow();
      });

      it('should throw a error when the count is not between min and max', function () {
        expect(function () {
          config.set({
            property1: 5,
            arrayCount: []
          });
        }).toThrowError(/Expected array to contain 1 or more values/);

        expect(function () {
          config.set({
            property1: 5,
            arrayCount: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
          });
        }).toThrowError(/Expected array to contain 10 or less values/);
      });
    });

    describe('modifier', function () {
      it('should modify the set value', function () {
        expect(function () {
          config.set({
            property1: 5,
            modified: 'suffix'
          });
        }).not.toThrow();

        expect(config.get().modified).toBe('prefix-suffix');
      });
    });
  });
}