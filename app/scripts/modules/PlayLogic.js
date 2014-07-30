define([],function(){
   // Instance stores a reference to the Singleton
  var instance;

  function init() {
    
    function exceeds31(runningTotal, card){
      return(runningTotal + card.value) > 31;
    }
    function evaluatePair(){}
    function evaluateRun(){}

    var currentCards = [];
    return {
      

      runningValue: 0,


      getPlayedCards: function(){
        return currentCards;
      },
      resetRunningValue: function(){
        this.runningValue = 0;
      },
      evaluateHisHeels: function(player, card){
        if(card.faceValue == 11)
          player.score += 2;
      },
      isCardPlayable: function(player, card){
        console.log(player.name + ': ' + card.value)
        if(!this.hasPlayableCards(player)) {
          return false;
        } else if(exceeds31(this.runningValue, card)){
          return false;
        }

        return true;
      },
      evaluateCard: function(player, card) {
        console.log(player.name + ': ' + card.value)
        if(!this.hasPlayableCards(player)) {
          throw new Error('No Playable Cards');
        } else if(exceeds31(this.runningValue, card)){
          throw new Error('Exceeds 31');
        }

        this.runningValue += card.value;
        
        evaluatePoints(this.runningValue, player);
        console.log('runningTotal: ' + this.runningValue);
        return currentCards.push(card);
      },

      playableCards: function(player){
        var playableCards = [];
        player.hand.forEach(function(card){
          if(card.value < (31 - this.runningValue))
            playableCards.push(card);
        }.bind(this))

        return playableCards;
      },

      hasPlayableCards: function(player){
        return (this.playableCards(player).length > 0);
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
