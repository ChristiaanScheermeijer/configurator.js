if (typeof define === 'function' && define.amd) {
  define([], configurator);
} else if (typeof exports === 'object') {
  module.exports = configurator;
}else{
  root.configurator = configurator;
}