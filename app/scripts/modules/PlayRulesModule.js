define([], function(){
  'use strict';

  function PlayRules(options){
    this.board = options.board;
  }

  function exceeds31(runningTotal, card){
    return (runningTotal + card.value) > 31;
  }


  PlayRules.prototype.isCardPlayable = function(player, card){
    if(!this.hasPlayableCards(player)){
      return false;
    }

    if(exceeds31(this.board.currentBoardValue, card)){
      //console.log(card.value + ' exceeds 31 at with current running value: ' + this.board.currentBoardValue)
      return false;
    }

    return true;
  };

  PlayRules.prototype.playableCards = function(player){
    var playableCards = [];
    player.hand.forEach(function(card){
      if(card.value <= (31 - this.board.currentBoardValue))
        playableCards.push(card);
    }.bind(this));

    return playableCards;
  };

  PlayRules.prototype.hasPlayableCards = function(player){
    return (this.playableCards(player).length > 0);
  };

  return PlayRules;

});
