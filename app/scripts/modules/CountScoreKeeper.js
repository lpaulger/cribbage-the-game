define(['scripts/modules/BaseScoreKeeper'], function(BaseScoreKeeper){
  'use strict';

  function CountScoreKeeper(){
    BaseScoreKeeper.call(this);
  }

  CountScoreKeeper.prototype = Object.create(BaseScoreKeeper.prototype);
  CountScoreKeeper.prototype.constructor = CountScoreKeeper;

  function combinationUtil(inputArray, sizeOfInputArray, sizeOfCombination, index, tempArray, indexOfCurrentElementOfInputArray, matchesArr, matchCondition)
  {
    // Current combination is ready, check it
    if (index === sizeOfCombination)
    {
      var total = 0;
      for (var j=0; j<sizeOfCombination; j++)
        total += tempArray[j].value;
      if(total === matchCondition)
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


  CountScoreKeeper.prototype.get15s = function(hand, starter){
    var cards = hand.concat(starter);
    var arrayOfMatches = [];
    var tempArray = [];
    for(var i = 0; i <= cards.length; i++){
      combinationUtil(cards, cards.length, i, 0, tempArray, 0, arrayOfMatches, 15);
    }

    return arrayOfMatches.length * 2;
  };

  CountScoreKeeper.prototype.getPairs = function(hand, starter){
    var pairs = [];
    var cards = hand.concat(starter);
    cards.forEach(function(card, index, array){
      for(var i = index + 1; i < array.length; i++){
        if(card.faceValue === array[i].faceValue){
          pairs.push([card, array[i]]);
        }
      }
    });

    return pairs.length * 2;
  };

  CountScoreKeeper.prototype.getRuns = function(hand, starter){
    var points = 0;

    var cards = hand.concat(starter);

    function combine(a, min) {
      var fn = function(n, src, got, all) {
        if (n === 0) {
          if (got.length > 0) {
            all[all.length] = got;
          }
          return;
        }
        for (var j = 0; j < src.length; j++) {
          fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
      };
      var all = [];
      for (var i = min; i < a.length; i++) {
        fn(i, a, [], all);
      }
      all.push(a);
      return all;
    }

    function sortByFaceValue(a, b){
      return a.faceValue - b.faceValue;
    }

    function sortComboByFaceValue(array){
      array.sort(sortByFaceValue);
      return array;
    }

    function isSequential(card, i, arr){
      if(i === arr.length - 1)//isLastCard
        return true;
      return card.faceValue + 1 === arr[i + 1].faceValue;
    }

    var combinations = combine(cards, 3);
    combinations.forEach(sortComboByFaceValue);

    var sequentialCombos = combinations.filter(function(array){
      return array.every(isSequential);
    });

    var largestSize = 0;
    sequentialCombos.forEach(function(value){
      if(value.length > largestSize)
        largestSize = value.length;
    });

    var filtered = sequentialCombos.filter(function(array){
      return array.length === largestSize;
    });

    filtered.forEach(function(set){
      points += set.length;
    });

    return points;
  };

  CountScoreKeeper.prototype.getHandFlush = function(hand, starter){

    function isFlush(card, index, array){
      return card.suit === array[0].suit;
    }

    var handAndStarter = hand.slice(0,hand.length);
    handAndStarter.push(starter);
    if(handAndStarter.every(isFlush))
      return 5;
    if(hand.every(isFlush))
      return 4;

    return 0;
  };

  CountScoreKeeper.prototype.getNobs = function(hand, starter){
    var hasMatchingJack = hand.some(function(card){
      return card.faceValue === 11 && card.suit === starter.suit;
    });
    return hasMatchingJack ? 1 : 0;
  };

  CountScoreKeeper.prototype.evaluateHand = function(player, starter){
    var gainedPoints = 0;
    gainedPoints += this.get15s(player.hand,starter);

    gainedPoints += this.getPairs(player.hand, starter);

    gainedPoints += this.getRuns(player.hand, starter);

    gainedPoints += this.getHandFlush(player.hand, starter);

    gainedPoints += this.getNobs(player.hand, starter);

    if(gainedPoints !== 0)
      player.currentPoints = player.points;
    player.points += gainedPoints;

    this.mediator.publish('messages-add', player.name + ' scored ' + gainedPoints + ' points.');
  };

  return CountScoreKeeper;
});
