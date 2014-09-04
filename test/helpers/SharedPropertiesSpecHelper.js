function sharedPropertiesSpecHelper() {

  describe('properties', function () {

    it('should be able to set properties', function () {
      expect(function () {
        config.set({
          property1: 5,
          property2: 'anotherstring',
          nested:    {
            property1: true,
            property2: 'anotherstring'
          }
        });
      }).not.toThrow();

      expect(config.get().property1).toBe(5);
      expect(config.get().property2).toBe('anotherstring');
      expect(config.get().nested.property1).toBe(true);
      expect(config.get().nested.property2).toBe('anotherstring');
    });

    it('should throw a error for setting wrong value type(s)', function () {
      expect(function () {
        config.set({
          property1: true
        });
      }).toThrowError(/type mismatch expected `number` got `boolean`/);

      expect(function () {
        config.set({
          property1: 5,
          nested:    {
            property1: 'string'
          }
        });
      }).toThrowError(/type mismatch expected `boolean` got `string`/);
    });

    it('should throw a error if a property is required', function () {
      expect(function () {
        config.set({
          property2: 'anotherstring'
        });
      }).toThrowError(/is required/);

      expect(function () {
        config.set({
          property2: 'anotherstring',
          nested: {
            property2: 'string'
          }
        });
      }).toThrowError(/is required/);
    });

    it('should use default values if none are set', function () {
      config.set({
        property1: 5
      });

      expect(config.get().property2).toEqual('defaultString');
    });
  });
}