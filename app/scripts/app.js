define(['modules/GameModule'],
  function(Game){
    'use strict';

    return {
      init: function(){
        this.$game = new Game();
        this.$game.start();
      }
    };
  });
