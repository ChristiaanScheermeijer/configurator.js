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
          nested:    {
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

    it('should allow any type for mixed nodes', function () {
      expect(function () {
        config.set({
          property1: 5,
          mixedNode: true
        })
      }).not.toThrow();

      expect(function () {
        config.set({
          property1: 5,
          mixedNode: 5
        })
      }).not.toThrow();

      expect(function () {
        config.set({
          property1: 5,
          mixedNode: 'string'
        })
      }).not.toThrow();
    });

    it('should allow and validate mixed node children', function () {
      expect(function () {
        config.set({
          property1:             5,
          mixedNodeWithChildren: ['string', 'anotherstring']
        });
      }).not.toThrow();

      expect(function () {
        config.set({
          property1:             5,
          mixedWithChildren: {
            key1: 'string',
            key2: 'string'
          }
        });
      }).not.toThrow();

      expect(function () {
        config.set({
          property1:             5,
          mixedWithChildren: [true, 'anotherstring']
        });
      }).toThrowError(/type mismatch expected `string` got `boolean`/);

      expect(function () {
        config.set({
          property1:             5,
          mixedWithChildren: {
            key1: true,
            key2: 'string'
          }
        });
      }).toThrowError(/type mismatch expected `string` got `boolean`/);
    });
  });
}