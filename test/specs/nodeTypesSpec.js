describe('Node type validation', function () {

  describe('StringNode', function () {
    var stringNode = new configurator.StringNode('test');
    it('should not throw error when a string is set', function () {
      expect(function () {
        stringNode.set('a string');
      }).not.toThrow();
    });

    it('should throw error when a wrong value is set', function () {
      expect(function () {
        stringNode.set(5);
      }).toThrowError(/type mismatch expected `\[object String\]` got `\[object Number\]`/g);
    });
  });

  describe('NumberNode', function () {
    var numberNode = new configurator.NumberNode('test');
    it('should not throw error when a number is set', function () {
      expect(function () {
        numberNode.set(5);
      }).not.toThrow();
    });

    it('should throw error when a wrong value is set', function () {
      expect(function () {
        numberNode.set('a string');
      }).toThrowError(/type mismatch expected `\[object Number\]` got `\[object String\]`/g);
    });
  });

  describe('BooleanNode', function () {
    var booleanNode = new configurator.BooleanNode('test');
    it('should not throw error when a boolean is set', function () {
      expect(function () {
        booleanNode.set(false);
      }).not.toThrow();
    });

    it('should throw error when a wrong value is set', function () {
      expect(function () {
        booleanNode.set(5);
      }).toThrowError(/type mismatch expected `\[object Boolean\]` got `\[object Number\]`/g);
    });
  });

  describe('ArrayNode', function () {
    var arrayNode = new configurator.ArrayNode('test');
    it('should not throw error when a array is set', function () {
      expect(function () {
        arrayNode.set([1, 2, 3]);
      }).not.toThrow();
    });

    it('should throw error when a wrong value is set', function () {
      expect(function () {
        arrayNode.set(5);
      }).toThrowError(/type mismatch expected `\[object Array\]` got `\[object Number\]`/g);
    });
  });

  describe('ObjectNode', function () {
    var objectNode = new configurator.ObjectNode('test');
    it('should not throw error when a object is set', function () {
      expect(function () {
        objectNode.set({
          property1: true
        });
      }).not.toThrow();
    });

    it('should throw error when a wrong value is set', function () {
      expect(function () {
        objectNode.set(false);
      }).toThrowError(/type mismatch expected `\[object Object\]` got `\[object Boolean\]`/g);
    });
  });

  describe('FunctionNode', function () {
    var functionNode = new configurator.FunctionNode('test');
    it('should not throw error when a function is set', function () {
      expect(function () {
        functionNode.set(function () {
          return true;
        });
      }).not.toThrow();
    });

    it('should throw error when a wrong value is set', function () {
      expect(function () {
        functionNode.set(false);
      }).toThrowError(/type mismatch expected `\[object Function\]` got `\[object Boolean\]`/g);
    });
  });

  describe('MixedNode', function () {
    var mixedNode = new configurator.MixedNode('test');
    it('should not throw error when a value is set', function () {
      expect(function () {
        mixedNode.set('string');
        mixedNode.set(5);
        mixedNode.set(true);
        mixedNode.set([1, 2, 3]);
        mixedNode.set({property1: true});
        mixedNode.set(function () {
          return true;
        });
      }).not.toThrow();
    });
  });

  describe('Regex', function () {
    var regexNode = new configurator.RegexNode('test');
    it('should not throw error when a regex is set', function () {
      expect(function () {
        regexNode.set(new RegExp("/regex/g"));
      }).not.toThrow();
    });

    it('should throw error when a wrong value is set', function () {
      expect(function () {
        regexNode.set(false);
      }).toThrowError(/type mismatch expected `\[object Regexp\]` got `\[object Boolean\]`/g);
    });
  });

  describe('Date', function () {
    var dateNode = new configurator.RegexNode('test');
    it('should not throw error when a regex is set', function () {
      expect(function () {
        dateNode.set(new RegExp("/regex/g"));
      }).not.toThrow();
    });

    it('should throw error when a wrong value is set', function () {
      expect(function () {
        dateNode.set(false);
      }).toThrowError(/type mismatch expected `\[object Regexp\]` got `\[object Boolean\]`/g);
    });
  });
});