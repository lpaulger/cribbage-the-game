define(['modules/PlayerModule', 'modules/BoardModule'], function (Player, Board) {
  var _board = Board.getInstance();
  function PlayerAi(name, possesive){
    Player.call(this, name, possesive);
    logic = this.playLogic;
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
    var player = this;

    var selectedCard = this.hand.filter(function(card, index){
      return logic.isCardPlayable(player, card);
    })[0];

    if(selectedCard)
    {
      this.hand.splice(this.hand.indexOf(selectedCard), 1)[0];
      _board.placeCard(selectedCard, player);
      gm.$messages = ['Your Turn.'];
    } else {
      this.announceGo();
    }
  };

  return PlayerAi;
});
