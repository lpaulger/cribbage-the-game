define([], function(){
  var instance;

  function init() {
    return {
      isTwoForHisHeels: function(card){
        return card.faceValue == 11;
      },
      TwoForHisHeels: function(card, player){
        if(this.isTwoForHisHeels(card)){
          console.log('TwoForHisHeels for ' + player.name + ' 2 points');
          player.points += 2;
        }
      },
      playCount: function (playCards) {
        return playCards.reduce(function (a, b) {
          if (typeof(a) == 'number')
            return a + b.value;
          return a.value + b.value;
        });
      },
      is15: function(playCards){
        return this.playCount(playCards) == 15;
      },

      is31: function(playCards){
        return this.playCount(playCards) == 31;
      },
      hasAtLeastOnePair: function(playCards){
        if(playCards.length > 1)
          return playCards[playCards.length - 1].faceValue == playCards[playCards.length - 2].faceValue;
        return false;
      },
      isLastCard: function(totalPlayedCards){
        return totalPlayedCards.length == 8;
      },
      iterateCardsForRun: function (playedCards) {
        var runValue = 0;
        var _sortedCards, _subSet;
        //order cards and check of they are a straight. compare between 3 and length of cards played.
        //can't have a run less than 3 cards

        for(var i = 3; i <= playedCards.length; i+=1){
          _subSet = playedCards.slice(playedCards.length - i, playedCards.length);
          _sortedCards = _subSet.sort(sortByFaceValue);

          //check sequence is good, if so continue else break
          var isSuccessfulRun = _sortedCards.every(function(ele, index, array){

            if(index == array.length - 1)//isLastCard
              return true;

            return (ele.faceValue + 1) == array[index + 1].faceValue;
          });

          if(isSuccessfulRun)
            setRunValue();
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

        return runValue;
      },
      hasARun: function(playCards){
        var count = this.iterateCardsForRun(playCards);

        function atLeastTwoSequencesOfCardsForRun() {
          return count > 2;
        }

        return atLeastTwoSequencesOfCardsForRun();
      },
      scoreRun: function(playCards, player){
        var count = this.iterateCardsForRun(playCards);

        if(count > 2){
          console.log('hasARun for ' + player.name + ' ' + count + ' points');
          player.points += count;
        }
      },
      scorePairs: function(playCards, player){
        var topCard = playCards[playCards.length - 1];
        for(var i = playCards.length - 2; i >= 0; i--){
          if(topCard.faceValue == playCards[i].faceValue){
            console.log('hasPairs for ' + player.name + ' 2 points');
            player.points += 2;
          } else {
            break;
          }
        }
      },
      pointForGo: function(player){
        player.points += 1;
      },
      evaluatePlay: function(playCards, player, totalPlayedCards){
        if(this.is15(playCards)){
          console.log('is15 for ' + player.name + ' 2 points');
          player.points += 2;
        }

        if(this.is31(playCards)){
          console.log('is31 for ' + player.name + ' 2 points');
          player.points += 2;
        }

        if(this.hasAtLeastOnePair(playCards))
          this.scorePairs(playCards, player);
        if(this.hasARun(playCards))
          this.scoreRun(playCards, player);
        if(this.isLastCard(totalPlayedCards)){
          console.log('isLastCard for ' + player.name + ' 1 point');
          player.points += 1;
        }
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