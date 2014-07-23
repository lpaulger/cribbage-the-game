define(['modules/DeckModule', 'modules/PlayerModule'],function(Deck, Player){
  function BaseState(game){
    this.game = game;
  };

  BaseState.prototype.deck = function() {};

  BaseState.prototype.selectCard = function() {};

  return BaseState;
});