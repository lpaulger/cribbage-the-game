define([], function(){
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
      return playCards[playCards.length - 1].faceValue == playCards[playCards.length - 2].faceValue;
    },
    hasARun: function(playCards){
      var count = 0;
      for(var i = playCards[playCards.length - 1].faceValue; i >= 0; i--){
        if(playCards[i-1].faceValue < playCards[i].faceValue){

        } else {
          break;
        }
      }
    },
    scoreRun: function(playCards, player){

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
    evaluatePlay: function(playCards, player){
      if(this.is15(playCards))
        player.points += 2;
      if(this.is31(playCards))
        player.points += 2;
      if(this.hasAtLeastOnePair(playCards))
        this.scorePairs(playCards, player);
    }
  };
});