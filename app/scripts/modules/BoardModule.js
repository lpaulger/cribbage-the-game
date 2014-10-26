define([], function(){
  'use strict';

  function Board(options){
    this.currentBoardValue = options.currentBoardValue || 0;
    this.totalPlayedCardsForRound = options.totalPlayedCardsForRound || [];
    this.playedCards = options.playedCards || [];
    this.playersWhoSaidGo = options.playersWhoSaidGo || [];
    this.scoreKeeper = options.scoreKeeper;
  }

  Board.prototype.display = function(){
    return this.currentBoardValue > 0 ? 'inline-block':'none';
  };

  Board.prototype.placeCard = function(card){
    this.playedCards.push(card);
    this.totalPlayedCardsForRound.push(card);
    this.currentBoardValue += card.value;
  };

  Board.prototype.announceGo = function(player){
    function otherPlayerAnnouncedGo(){
      return this.playersWhoSaidGo.indexOf(player) === -1 &&
        this.playersWhoSaidGo.length > 0;
    }

    if(otherPlayerAnnouncedGo.call(this)){
      this.resetBoard();
      this.scoreKeeper.pointForGo(player);
    } else {
      this.playersWhoSaidGo.push(player);
    }
  };

  Board.prototype.clearBoard = function(){
    this.totalPlayedCardsForRound = [];
    this.resetBoard();
  };

  Board.prototype.resetBoard = function(){
    this.currentBoardValue = 0;
    this.playedCards = [];
    this.playersWhoSaidGo = [];
  };


  return Board;
});
