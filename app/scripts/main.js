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

require(['app', 'modules/GameModule', 'modules/Mediator', 'gameStates/StateRegistry'], function (App, Game, Mediator, StateRegistry) {
  'use strict';
  var app = new App(Game, Mediator, StateRegistry);
  app.init();
});