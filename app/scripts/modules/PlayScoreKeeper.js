define(['modules/BaseScoreKeeper'], function(BaseScoreKeeper){
  'use strict';

  function PlayScoreKeeper(){
    BaseScoreKeeper.call(this);
  }

  PlayScoreKeeper.prototype = Object.create(BaseScoreKeeper.prototype);
  PlayScoreKeeper.prototype.constructor = PlayScoreKeeper;

  PlayScoreKeeper.prototype.isTwoForHisHeels = function(card){
    return card.faceValue === 11;
  };

  PlayScoreKeeper.prototype.TwoForHisHeels = function(card){
    if(this.isTwoForHisHeels(card)){
      //console.log('TwoForHisHeels for ' + player.name + ' 2 points');
      return 2;
    }
  };
  PlayScoreKeeper.prototype.playCount = function (playCards) {
    return playCards.reduce(function (a, b) {
      if (typeof(a) === 'number')
        return a + b.value;
      return a.value + b.value;
    });
  };
  PlayScoreKeeper.prototype.is15 = function(playCards){
    return this.playCount(playCards) === 15;
  };
  PlayScoreKeeper.prototype.is31 = function(playCards){
    return this.playCount(playCards) === 31;
  };
  PlayScoreKeeper.prototype.hasAtLeastOnePair = function(playCards){
    if(playCards.length > 1)
      return playCards[playCards.length - 1].faceValue === playCards[playCards.length - 2].faceValue;
    return false;
  };
  PlayScoreKeeper.prototype.isLastCard = function(totalPlayedCards){
    return totalPlayedCards.length === 8;
  };
  PlayScoreKeeper.prototype.iterateCardsForRun = function (playedCards) {
    var runValue = 0;
    var _sortedCards, _subSet;

    function checkSequence(ele, index, array){

      if(index === array.length - 1)//isLastCard
        return true;

      return (ele.faceValue + 1) === array[index + 1].faceValue;
    }

    function sortByFaceValue(a, b){
      if(a.faceValue < b.faceValue)
        return -1;
      if(a.faceValue > b.faceValue)
        return 1;
      return 0;
    }

    function setRunValue() {
      runValue = _sortedCards.length;
    }

    //order cards and check of they are a straight. compare between 3 and length of cards played.
    //can't have a run less than 3 cards

    for(var i = 3; i <= playedCards.length; i+=1){
      _subSet = playedCards.slice(playedCards.length - i, playedCards.length);
      _sortedCards = _subSet.sort(sortByFaceValue);

      //check sequence is good, if so continue else break
      var isSuccessfulRun = _sortedCards.every(checkSequence);

      if(isSuccessfulRun)
        setRunValue();
    }

    return runValue;
  };
  PlayScoreKeeper.prototype.hasARun = function(playCards){
    var count = this.iterateCardsForRun(playCards);

    function atLeastTwoSequencesOfCardsForRun() {
      return count > 2;
    }

    return atLeastTwoSequencesOfCardsForRun();
  };
  PlayScoreKeeper.prototype.scoreRun = function(playCards){
    var count = this.iterateCardsForRun(playCards);

    if(count > 2){
      //console.log('hasARun for ' + player.name + ' ' + count + ' points');
      return count;
    }
  };
  PlayScoreKeeper.prototype.scorePairs = function(playCards){
    var topCard = playCards[playCards.length - 1];

    var matches = 0;
    for(var i = playCards.length - 2; i >= 0; i--){
      if(topCard.faceValue === playCards[i].faceValue){

        matches++;
      } else {
        break;
      }
    }

    return ((matches+1) * matches);
  };
  PlayScoreKeeper.prototype.pointForGo = function(){
    return 1;
  };
  PlayScoreKeeper.prototype.evaluatePlay = function(playCards, totalPlayedCards){
    var points = 0;
    if(this.is15(playCards)){
      //console.log('is15 for ' + player.name + ' 2 points');
      points += 2;
    }

    if(this.is31(playCards)){
      //console.log('is31 for ' + player.name + ' 2 points');
      points += 2;
    }

    if(this.hasAtLeastOnePair(playCards))
      points += this.scorePairs(playCards);
    if(this.hasARun(playCards))
      points += this.scoreRun(playCards);
    if(this.isLastCard(totalPlayedCards)){
      //console.log('isLastCard for ' + player.name + ' 1 point');
      points += 1;
    }

    return points;
  };

  return PlayScoreKeeper;
});