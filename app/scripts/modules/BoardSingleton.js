define(['modules/PlayScoreKeeper'], function (ScoreKeeper) {
  'use strict';
  var instance,
    scoreKeeper = new ScoreKeeper();

  function init() {
    return {
      display: function(){
        return this.currentBoardValue > 0? 'inline-block':'none';
      },
      currentBoardValue: 0,
      totalPlayedCardsForRound: [],
      playedCards: [],
      playersWhoSaidGo: [],
      isEndOfRound: function () {
        return this.totalPlayedCardsForRound.length === 8;
      },
      placeCard: function(card){
        this.playedCards.push(card);
        this.totalPlayedCardsForRound.push(card);
        this.currentBoardValue += card.value;
      },
      announceGo: function(player){
        function otherPlayerAnnouncedGo() {
          return this.playersWhoSaidGo.indexOf(player) === -1 &&
            this.playersWhoSaidGo.length > 0;
        }

        if(otherPlayerAnnouncedGo.call(this)){
          this.resetBoard();
          return scoreKeeper.pointForGo(player);
        } else {
          this.playersWhoSaidGo.push(player);
        }
      },
      resetBoard: function(){
        this.currentBoardValue = 0;
        this.playedCards = [];
        this.playersWhoSaidGo = [];
      }
    };
  }

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    }
  };
});
