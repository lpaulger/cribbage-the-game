define(['modules/DeckModule', 'modules/PlayerModule'],function(Deck, Player){
  function BaseState(game, name){
    this.game = game;
    this.name = name;
  };

  BaseState.prototype.init = function() {
    console.log('base init');
  };

  BaseState.prototype.deck = function() {
    console.log('base deck');
  };

  BaseState.prototype.selectCard = function() {
    console.log('base selectCard');
  };

  BaseState.prototype.action = function() {
    console.log('base action');
  };

  return BaseState;
});
