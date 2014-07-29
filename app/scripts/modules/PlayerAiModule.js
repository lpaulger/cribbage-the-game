define(['modules/PlayerModule'], function (Player) {
  function PlayerAi(name, possesive){
    Player.call(this, name, possesive);
  }

  PlayerAi.prototype = Object.create(Player.prototype);
  PlayerAi.prototype.constructor = PlayerAi;

  PlayerAi.prototype.placeCardsInCrib = function(cribOwner) {
    for(var i = 0; i < 2; i++){
      var index = Math.floor(Math.random() * this.hand.length);
      cribOwner.crib.push(this.hand.splice(index, 1));
    }
  };

  PlayerAi.prototype.selectOneFromDeck = function(deck) {
    var index = Math.floor(Math.random() * deck.cards.length);
    return deck.selectOne(index);
  };

  PlayerAi.prototype.playCard = function() {
    var index = Math.floor(Math.random() * this.hand.length);
    if(this.evaluatePlayableCards().length == 0 || this.hand.length == 0)
      return this.announceGo();
    var card = this.hand.splice(index, 1)[0];
    this.scores.evaluateCard(this, card);
    return this.play.push(card);
  };


  return PlayerAi;
});
