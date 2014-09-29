define(['gameStates/BaseState'],function(BaseState){
  'use strict';
  function PrePlayState(game){
    BaseState.call(this, game, 'PrePlay');
  }

  PrePlayState.prototype = Object.create(BaseState.prototype);
  PrePlayState.prototype.constructor = PrePlayState;

  PrePlayState.prototype.init = function(){
    if(this.game.$cribOwner !== this.game.$player1)
      this.game.$messages = ['Reveal Top Card'];
    else {
      this.game.$messages = ['They will reveal top card'];
      var index = Math.floor(Math.random() * this.game.$deck.cards.length);
      this.game.topCard = this.game.$cribOwner.selectOneFromDeck(this.game.$deck, index);
      this.game.transitionTo('Play', true);
    }

  };

  PrePlayState.prototype.deck = function(cardIndex) {
    this.game.topCard = this.game.$cribOwner.selectOneFromDeck(this.game.$deck, cardIndex);
    this.game.transitionTo('Play', false);
  };

  return PrePlayState;
});
