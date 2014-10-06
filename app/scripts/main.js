require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    mustache: '../bower_components/mustache/mustache'
  },
  shim: {
    'jquery': {
      exports: '$'
    }
  }
});

require(['app', 'modules/GameModule'], function (App, Game) {
  'use strict';
  var app = new App(Game);
  app.init();
});