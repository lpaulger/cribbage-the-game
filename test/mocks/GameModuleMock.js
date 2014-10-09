define([],function(){
    'use strict';
    function Game(){
      this.$messages = [];
      this.$board = {
        clearBoard: function(){}
      };
      this.mediator = {
        subscribe: function(){},
        publish: function(){}
      };
    }

    return Game;
  });
