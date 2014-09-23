function sharedArraySpecHelper() {

  describe('arrays', function () {

    it('should be able to set array values with correct type(s)', function () {
      expect(function () {
        config.set({
          property1: 5,
          array: [true, false, true]
        });
      }).not.toThrow();
    });

    it('should throw a error when set array values with wrong type(s)', function () {
      expect(function () {
        config.set({
          property1: 5,
          array: [true, false, 'string']
        });
      }).toThrowError(/type mismatch expected `\[object Boolean\]` got `\[object String\]`/);
    });
  });
}