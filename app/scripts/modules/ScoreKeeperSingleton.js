define([], function(){
  var instance;

  function init() {
    return {
      isTwoForHisHeels: function(card){
        return card.faceValue == 11;
      },
      TwoForHisHeels: function(card, player){
        if(this.isTwoForHisHeels(card))
          player.points += 2;
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
      iterateCardsForRun: function (playCards) {
        var count = 0;
        //iterate cards backwards
        for (var i = playCards.length - 1; i > 0; i--) {
          //check run backwards
          if (isCardValueOneAboveNextCard(i)) {
            count++;
          } else if (isCardValueOneBelowNextCard(i)) {
            count++;
          } else {
            break;
          }
        }

        function isCardValueOneAboveNextCard(i) {
          return playCards[i].faceValue == playCards[i - 1].faceValue - 1;
        }

        function isCardValueOneBelowNextCard(i) {
          return playCards[i].faceValue == playCards[i - 1].faceValue + 1;
        }

        return count;
      },
      hasARun: function(playCards){
        var count = this.iterateCardsForRun(playCards);

        function atLeastTwoSequencesOfCardsForRun() {
          return count > 1;
        }

        return atLeastTwoSequencesOfCardsForRun();
      },
      scoreRun: function(playCards, player){
        var count = this.iterateCardsForRun(playCards);

        if(count > 1){
          player.points += (count+1);
        }
      },
      scorePairs: function(playCards, player){
        var topCard = playCards[playCards.length - 1];
        for(var i = playCards.length - 2; i >= 0; i--){
          if(topCard.faceValue == playCards[i].faceValue){
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
        if(this.is15(playCards))
          player.points += 2;
        if(this.is31(playCards))
          player.points += 2;
        if(this.hasAtLeastOnePair(playCards))
          this.scorePairs(playCards, player);
        if(this.hasARun(playCards))
          this.scoreRun(playCards, player);
        if(this.isLastCard(totalPlayedCards))
          player.points += 1;
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