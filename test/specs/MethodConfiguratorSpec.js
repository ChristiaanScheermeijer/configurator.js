describe('MethodConfigSpec', function () {

  methodConfigHelper();

  describe('definition', function () {
    it('should be able to create a small config', function () {
      expect(config).toEqual(jasmine.any(configurator.ObjectNode));
      expect(config.childNodes.property1).toBeDefined();
      expect(config.childNodes.property2).toBeDefined();
    });
  });

  sharedNodeTypeSpecHelper();
  sharedCollectionSpecHelper();
  sharedArraySpecHelper();
  sharedAssertSpecHelper();

  describe('not shared', function() {
    it('should be able to call end() many times but should stop at root node', function() {
      var aLotOfEnds = config.end().end().end();
      expect(aLotOfEnds).toBe(config);
    });
  });
});