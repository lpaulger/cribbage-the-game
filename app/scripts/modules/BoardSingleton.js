define(['modules/ScoreKeeperSingleton'], function (ScoreKeeper) {
  'use strict';
  var instance,
    scoreKeeper = ScoreKeeper.getInstance();

  function init() {
    return {
      currentBoardValue: 0,
      totalPlayedCards: [],
      playedCards: [],
      playersWhoSaidGo: [],
      placeCard: function(card, player){
        this.playedCards.push(card);
        this.totalPlayedCards.push(card);
        this.currentBoardValue += card.value;
        scoreKeeper.evaluatePlay(this.playedCards, player, this.totalPlayedCards);
        if(this.currentBoardValue == 31) {
          this.resetBoard();
        }
      },
      announceGo: function(player){
        if(otherPlayerAnnouncedGo.call(this)){
          scoreKeeper.pointForGo(player);
          this.resetBoard();
        } else {
          this.playersWhoSaidGo.push(player)
        }

        function otherPlayerAnnouncedGo() {
          return this.playersWhoSaidGo.indexOf(player) == -1 &&
            this.playersWhoSaidGo.length > 0;
        }
      },
      resetBoard: function(){
        this.currentBoardValue = 0;
        this.playedCards = [];
        this.playersWhoSaidGo = [];
      }
    }
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
