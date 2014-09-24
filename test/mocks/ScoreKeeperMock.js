define([], function(){
  var instance;
  function init(){
    return {
      isTwoForHisHeels: function(card){},
      TwoForHisHeels: function(card, player){},
      playCount: function (playCards) {},
      is15: function(playCards){},
      is31: function(playCards){},
      hasAtLeastOnePair: function(playCards){},
      evaluatePlay: function(playCards, player){}
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