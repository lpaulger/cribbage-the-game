require.config({
  paths: {
    baseUrl: 'app',
    jquery: 'scripts/modules/DOMulator',
    mustache: 'bower_components/mustache/mustache'
  },
  shim: {
    'jquery': {
      exports: '$'
    }
  }
});
