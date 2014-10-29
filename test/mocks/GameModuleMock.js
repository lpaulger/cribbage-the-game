define([],function(){
    'use strict';
    function Game(){
      this.$messages = [];
      this.$board = {
        clearBoard: jasmine.createSpy('clearBoard')
      };
    }

    return Game;
  });
