define([], function(){
  var instance;

  function init() {
    return {
      get15s: function(hand, starter){

        var cards = hand.concat(starter);
        var arrayOfMatches = [];
        var tempArray = [];
        for(var i = 0; i <= cards.length; i++){
          combinationUtil(cards, cards.length, i, 0, tempArray, 0, arrayOfMatches, 15);
        }

        return arrayOfMatches.length * 2;

        function combinationUtil(inputArray, sizeOfInputArray, sizeOfCombination, index, tempArray, indexOfCurrentElementOfInputArray, matchesArr, matchCondition)
        {
          // Current combination is ready, check it
          if (index == sizeOfCombination)
          {
            var total = 0;
            for (var j=0; j<sizeOfCombination; j++)
              total += tempArray[j].value;
            if(total == matchCondition)
              matchesArr.push(tempArray.slice(0, tempArray.length));
            return;
          }

          // When no more elements are there to put in data[]
          if (indexOfCurrentElementOfInputArray >= sizeOfInputArray)
            return;

          // current is included, put next at next location
          tempArray[index] = inputArray[indexOfCurrentElementOfInputArray];
          combinationUtil(inputArray, sizeOfInputArray, sizeOfCombination, index+1, tempArray, indexOfCurrentElementOfInputArray+1, matchesArr, matchCondition);

          // current is excluded, replace it with next (Note that
          // i+1 is passed, but index is not changed)
          combinationUtil(inputArray, sizeOfInputArray, sizeOfCombination, index, tempArray, indexOfCurrentElementOfInputArray+1, matchesArr, matchCondition);
        }
      },
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

        return pairs.length * 2;
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

        var handAndStarter = hand.slice(0,hand.length);
        handAndStarter.push(starter);
        if(handAndStarter.every(isFlush))
          return 5;
        if(hand.every(isFlush))
          return 4;

        return 0;

        function isFlush(card, index, array){
          return card.suit == array[0].suit;
        }
      },
      getNobs: function(hand, starter){
        var hasMatchingJack = hand.some(function(card){
          return card.faceValue == 11 && card.suit == starter.suit;
        });
        return hasMatchingJack ? 1 : 0;
      },
      evaluateHand: function(hand, starter, player){
        player.points += this.get15s(hand,starter);
        player.points += this.getPairs(hand, starter);
        player.points += this.getRuns(hand, starter);
        player.points += this.getHandFlush(hand, starter);
        player.points += this.getNobs(hand, starter);
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