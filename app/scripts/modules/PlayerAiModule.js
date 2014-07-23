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

  return PlayerAi;
});
