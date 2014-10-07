define(['modules/Mediator'],function(Mediator){
  'use strict';
  function BaseScoreKeeper(){
    this.mediator = Mediator;
  }

  BaseScoreKeeper.prototype.isWinner = function(player) {
    return player.points >= 121;
  };

  return BaseScoreKeeper;
});
