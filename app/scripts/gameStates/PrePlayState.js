define(['gameStates/BaseState'],function(BaseState){
  'use strict';
  function PrePlayState(game){
    BaseState.call(this, game, 'PrePlay');
  }

  PrePlayState.prototype = Object.create(BaseState.prototype);
  PrePlayState.prototype.constructor = PrePlayState;

  function selectTopCard(index, wait){
    var result = this.game.$cribOwner.selectOneFromDeck(this.game.$deck, index);
    if(result.isTwoForHisHeels){
      this.game.$cribOwner.points += result.isTwoForHisHeels;
      this.game.$messages = [this.game.$cribOwner.name + ' scored two for his heels'];
    }
    this.game.topCard = result.card;
    this.game.transitionTo('Play', wait);
  }

  PrePlayState.prototype.init = function(){
    if(this.game.$cribOwner !== this.game.$player1){
      this.game.$messages = ['They will reveal top card'];
      var index = Math.floor(Math.random() * this.game.$deck.cards.length);
      selectTopCard.call(this, index, true);
    } else {
      this.game.$messages = ['Reveal top card'];
    }
  };

  PrePlayState.prototype.deck = function(cardIndex) {
    selectTopCard.call(this, cardIndex, false);
  };

  return PrePlayState;
});
