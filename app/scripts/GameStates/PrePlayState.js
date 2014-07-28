define(['gameStates/BaseState', 'modules/DeckModule'],function(BaseState, Deck){
  function PrePlayState(game){
    BaseState.call(this, game, 'PrePlay');
    gm = this.game;
  }

  PrePlayState.prototype = Object.create(BaseState.prototype);
  PrePlayState.prototype.constructor = PrePlayState;

  PrePlayState.prototype.init = function(){
    if(gm.$cribOwner !== gm.$player1)
      this.game.$messages = ['Reveal Top Card'];
    else
      this.game.$messages = ['They will reveal top card'];
  };

  PrePlayState.prototype.deck = function(cardIndex) {
    //console.log(gm.$deck.selectOne(cardIndex));
    gm.transitionTo('Play', true);
  };

  PrePlayState.prototype.selectCard = function(options) {

  };

  PrePlayState.prototype.action = function() {

  };

  return PrePlayState;
});
