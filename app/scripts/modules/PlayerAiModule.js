define(['modules/PlayerModule'], function (Player) {
  function PlayerAi(name, possesive){
    Player.call(this, name, possesive);
    logic = this.playLogic;
  }

  PlayerAi.prototype = Object.create(Player.prototype);
  PlayerAi.prototype.constructor = PlayerAi;

  PlayerAi.prototype.placeCardsInCrib = function(cribOwner) {
    for(var i = 0; i < 2; i++){
      var index = Math.floor(Math.random() * this.hand.length);
      cribOwner.crib.push(this.hand.splice(index, 1));
    }
  };

  PlayerAi.prototype.playCard = function() {
    if(!logic.hasPlayableCards(this))
      return this.announceGo();

    var _tempHand = this.hand.slice();
        

    try{
      var index = Math.floor(Math.random() * logic.playableCards(this).length);
      var randomCard = logic.playableCards(this)[index];
      index = this.hand.indexOf(randomCard);
      
      var card = _tempHand.splice(index, 1)[0];
      logic.evaluateCard(this, card);
      this.hand.splice(index, 1)[0];
      return card;
    } catch(e){
      throw e;
    }
  };

  return PlayerAi;
});
