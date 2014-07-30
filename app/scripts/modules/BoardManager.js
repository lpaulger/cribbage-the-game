define([], function () {
  'use strict';
  var instance;

  function init() {
    function evaluatePoints(runningTotal, player){
      if(runningTotal == 15)
        player.score += 2;
      if(runningTotal == 31)
        player.score += 1;
    }
    return {
      currentPlayedValue: 0,
      playedCards: [],
      playCard: function(card){
        console.log('BoardManager')
        this.playedCards.push(card);
        this.currentPlayedValue += card.value;

        evaluatePoints(this.runningValue, player);
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