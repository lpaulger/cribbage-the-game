require.config({
  baseUrl: 'scripts',
  paths: {
    text: '../bower_components/requirejs-text/text',
    jquery: '../bower_components/zepto/zepto',
    mustache: '../bower_components/mustache/mustache'
  },
  shim: {
    'jquery': {
      exports: '$'
    }
  }
});
