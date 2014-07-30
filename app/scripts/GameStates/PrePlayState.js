define(['gameStates/BaseState'],function(BaseState){
  function PrePlayState(game){
    BaseState.call(this, game, 'PrePlay');
    gm = this.game;
  }

  PrePlayState.prototype = Object.create(BaseState.prototype);
  PrePlayState.prototype.constructor = PrePlayState;

  PrePlayState.prototype.init = function(){
    if(gm.$cribOwner !== gm.$player1)
      this.game.$messages = ['Reveal Top Card'];
    else {
      this.game.$messages = ['They will reveal top card'];
      var index = Math.floor(Math.random() * gm.$deck.cards.length);
      gm.topCard = gm.$cribOwner.selectOneFromDeck(gm.$deck, index);
      gm.transitionTo('Play', true);
    }

  };

  PrePlayState.prototype.deck = function(cardIndex) {
    gm.topCard = gm.$cribOwner.selectOneFromDeck(gm.$deck, cardIndex);
    gm.transitionTo('Play', false);
  };

  PrePlayState.prototype.selectCard = function(options) {

  };

  PrePlayState.prototype.action = function() {

  };

  return PrePlayState;
});
