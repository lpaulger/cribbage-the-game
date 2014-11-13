require.config({
  paths: {
    baseUrl: 'app',
    jquery: 'modules/DOMulator',
    mustache: 'bower_components/mustache/mustache'
  },
  shim: {
    'jquery': {
      exports: '$'
    }
  }
});
