require.config({
  baseUrl: 'scripts',
  paths: {
    jquery: '../bower_components/zepto/zepto',
    mustache: '../bower_components/mustache/mustache'
  },
  shim: {
    'jquery': {
      exports: '$'
    }
  }
});
