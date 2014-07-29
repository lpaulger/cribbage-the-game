define([],function(){
   // Instance stores a reference to the Singleton
  var instance;

  function init() {
    function evaluatePoints(runningTotal, player){
      if(runningTotal == 15)
        player.score += 2;
    }
    function exceeds31(runningTotal, card){
      return ((runningTotal + card.value) > 31);
    }
    function evaluatePair(){}
    function evaluateRun(){}
    return {
      runningValue: 0,
      currentCards: [],
      evaluateCard: function(player, card) {
        console.log(player.name + ': ' + card.value)
        if(exceeds31(this.runningValue, card)){
          throw new Error('Exceeds 31');
        }
        this.runningValue += card.value;
        
        evaluatePoints(this.runningValue, player);
        console.log('runningTotal: ' + this.runningValue);
        return this.currentCards.push(card);
      },
      evaluatePlayableCards: function(player){
        var playableCards = [];
        player.hand.forEach(function(card){
          if(card.value < (31 - this.runningValue))
            playableCards.push(card);
        }.bind(this))

        return playableCards;
      }
    };
  };

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
