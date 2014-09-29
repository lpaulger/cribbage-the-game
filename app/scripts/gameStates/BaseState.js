define([],function(){
  'use strict';
  function BaseState(game, name){
    this.game = game;
    this.name = name;
    this.p1 = game.$player1;
    this.p2 = game.$player2;
  }

  BaseState.prototype.init = function() {};

  BaseState.prototype.deck = function() {};

  BaseState.prototype.selectCard = function() {};

  BaseState.prototype.action = function() {};

  return BaseState;
});
