define(['GameStates/BaseState', 'modules/DeckModule'],function(BaseState, Deck){
  function PrePlayState(game){
    BaseState.call(this, game, 'PrePlay');
    gm = this.game;
  }

  PrePlayState.prototype = Object.create(BaseState.prototype);
  PrePlayState.prototype.constructor = PrePlayState;

  PrePlayState.prototype.init = function(){
    if(gm.$cribOwner !== gm.$player1)
      this.game.$messages = ['Reveal Top Card'];

  };

  PrePlayState.prototype.deck = function() {
    console.log('Reveal Top Card');
  };

  PrePlayState.prototype.selectCard = function(options) {

  };

  PrePlayState.prototype.action = function() {

  };

  return PrePlayState;
});
