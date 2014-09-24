define(['modules/BoardSingleton'],function(Board){
   // Instance stores a reference to the Singleton
  var instance;
  var _board = Board.getInstance();
  function init() {

    function exceeds31(runningTotal, card){
      return(runningTotal + card.value) > 31;
    }

    return {
      isCardPlayable: function(player, card){
        //console.log(player.name + ': ' + card.value)
        if(!this.hasPlayableCards(player)) {
          console.log(player.name + ' has no playable cards')
          return false;
        }

        if(exceeds31(_board.currentBoardValue, card)){
          console.log(card.value + ' exceeds 31 at with current running value: ' + _board.currentBoardValue)
          return false;
        }

        return true;
      },

      playableCards: function(player){
        var playableCards = [];
        player.hand.forEach(function(card){
          if(card.value <= (31 - _board.currentBoardValue))
            playableCards.push(card);
        }.bind(this));

        return playableCards;
      },

      hasPlayableCards: function(player){
        return (this.playableCards(player).length > 0);
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
