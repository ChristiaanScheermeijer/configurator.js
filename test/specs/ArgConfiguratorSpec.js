describe('ArgConfigSpec', function () {

  argConfigHelper();

  describe('definition', function () {
    it('should be able to create a small config', function () {
      expect(config).toEqual(jasmine.any(configurator.ObjectNode));
      expect(config.childNodes.property1).toBeDefined();
      expect(config.childNodes.property2).toBeDefined();
    });
  });

  sharedPropertiesSpecHelper();
  sharedCollectionSpecHelper();
  sharedArraySpecHelper();
  sharedAssertSpecHelper();
});