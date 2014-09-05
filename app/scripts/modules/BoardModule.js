define([], function () {
  'use strict';
  var instance;

  function init() {
    return {
      currentBoardValue: 0,
      playedCards: [],
      playersWhoSaidGo: [],
      placeCard: function(card, player){
        this.playedCards.push(card);
        this.currentBoardValue += card.value;
        //console.log(this.currentBoardValue)
        if(this.currentBoardValue == 31) {
          this.resetBoard();
        }
      },
      announceGo: function(player){
        if(this.playersWhoSaidGo.indexOf(player) == -1 &&
          this.playersWhoSaidGo.length > 0){
          this.resetBoard();
        } else {
          this.playersWhoSaidGo.push(player)
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
