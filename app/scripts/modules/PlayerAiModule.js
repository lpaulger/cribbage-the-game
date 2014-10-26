define(['modules/PlayerModule'], function (Player) {
  'use strict';
  function PlayerAi(options){
    Player.call(this, options);
  }

  PlayerAi.prototype = Object.create(Player.prototype);
  PlayerAi.prototype.constructor = PlayerAi;

  PlayerAi.prototype.placeCardsInCrib = function(cribOwner) {
    for(var i = 0; i < 2; i++){
      var index = Math.floor(Math.random() * this.hand.length);

      cribOwner.crib.push(this.hand.splice(index, 1)[0]);
    }
  };

  PlayerAi.prototype.playCard = function() {
    var selectedCard = this.hand.filter(function(card){
      return this.playRules.isCardPlayable(this, card);
    }.bind(this))[0];

    if(selectedCard)
    {
      return Player.prototype.playCard.call(this, this.hand.indexOf(selectedCard));
    } else {
      return this.announceGo();
    }
  };

  return PlayerAi;
});
