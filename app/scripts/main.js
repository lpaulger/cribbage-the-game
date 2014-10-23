require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    mustache: '../bower_components/mustache/mustache'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'localStorage':{
      exports: 'localStorage'
    }
  }
});

require(['app'], function (App) {
  'use strict';
  var app = new App();
  app.init();
});