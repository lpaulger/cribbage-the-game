define([],function(){
  'use strict';
  function BaseScoreKeeper(){

  }

  BaseScoreKeeper.prototype.isWinner = function(player) {
    return player.points >= 121;
  };

  return BaseScoreKeeper;
});
