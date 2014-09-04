describe('CoreSpec', function () {

  it('should expose a global variable', function () {
    expect(configurator).toBeDefined();
  });

  it('should expose Node class references as static functions', function () {
    expect(configurator.ObjectNode).toBeDefined();
    expect(configurator.ArrayNode).toBeDefined();
    expect(configurator.StringNode).toBeDefined();
    expect(configurator.NumberNode).toBeDefined();
    expect(configurator.BooleanNode).toBeDefined();
  });

  it('should return a ObjectNode instance', function() {
    expect(configurator()).toEqual(jasmine.any(configurator.ObjectNode));
  });

});