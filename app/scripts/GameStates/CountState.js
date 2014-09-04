define(['gameStates/BaseState'], function(BaseState){
  'use strict';
  function CountState(game){
    BaseState.call(this, game, 'Count');
    var gm = this.game;
    var p1 = gm.$player1;
    var p2 = gm.$player2;
  }

  CountState.prototype = Object.create(BaseState.prototype);
  CountState.prototype.constructor = CountState;

  CountState.prototype.init = function(){
    console.log(gm.$cribOwner);
    gm.$cribOwner == p1 ? gm.$player2HandVisible = true : gm.$player1HandVisible = true;
  };

  return CountState;
});