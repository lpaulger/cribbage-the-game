define(['jquery', 'mustache', 'modules/GameModule'],
  function($, mustache, Game){
    'use strict';

    return {
      init: function(){
        this.$game = new Game();
        this.$game.start();
      }
    };
  });
