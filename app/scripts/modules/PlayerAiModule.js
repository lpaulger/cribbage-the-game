define(['modules/PlayerModule'], function (Player) {
  'use strict';
  function PlayerAi(name, possessive){
    Player.call(this, name, possessive);
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
    var points = 0;

    var selectedCard = this.hand.filter(function(card){
      return this.playRules.isCardPlayable(this, card);
    }.bind(this))[0];

    if(selectedCard)
    {
      this.hand.splice(this.hand.indexOf(selectedCard), 1);
      this.board.placeCard(selectedCard, this);
      this.points += points = this.scoreKeeper.evaluatePlay(this.board.playedCards, this.board.totalPlayedCardsForRound);
      return points === 0 ? undefined : points;
    } else {
      return this.announceGo();
    }
  };

  return PlayerAi;
});
