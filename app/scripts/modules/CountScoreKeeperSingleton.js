define([], function(){
  var instance;

  function init() {
    return {
      getPairs: function(hand, starter){
        var pairs = [];
        var cards = hand.concat(starter);
        cards.forEach(function(card, index, array){
          for(var i = index + 1; i < array.length; i++){
            if(card.faceValue == array[i].faceValue){
              pairs.push([card, array[i]]);
            }
          }
        });

        return pairs.length;
      },
      getRuns: function(hand, starter){
        var _cards = hand.concat(starter);
        var _sortedCards = _cards.sort(sortByFaceValue);

        var runCards = _sortedCards.filter(function(card, i, array){
          if(i == array.length - 1)//isLastCard
            return true;
          return card.faceValue + 1 == array[i + 1].faceValue;
        });

        function sortByFaceValue(a, b){
          if(a.faceValue < b.faceValue)
            return -1;
          if(a.faceValue > b.faceValue)
            return 1;
          return 0;
        }

        if(runCards.length > 2)
          return runCards.length;
        else return 0;
      },
      getHandFlush: function(hand, starter){
        var _tempHand = hand.slice(0,hand.length);
        _tempHand.push(starter);
        console.log(_tempHand);
        if(_tempHand.every(isFlush))
          return 5;
        if(_tempHand.every(isFlush))
          return 4;

        return 0;

        function isFlush(card, index, array){
          console.log(card);
          console.log(array[0]);
          console.log(card.suit == array[0].suit);

          card.suit == array[0].suit;
        }
      },
      evaluateHand: function(hand, starter, player){
        player.points += this.getPairs(hand, starter) * 2;
        player.points += this.getRuns(hand, starter);
        player.points += this.getHandFlush(hand, starter);
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