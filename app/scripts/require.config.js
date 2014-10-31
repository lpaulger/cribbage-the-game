require.config({
  paths: {
    baseUrl: 'app',
    jquery: 'bower_components/jquery/dist/jquery',
    mustache: 'bower_components/mustache/mustache'
  },
  shim: {
    'jquery': {
      exports: '$'
    }
  }
});
