define(['scripts/gameStates/BaseState', 'jquery'],function(BaseState, $){
  'use strict';
  function PrePlayState(game){
    BaseState.call(this, game, 'PrePlay');
  }

  PrePlayState.prototype = Object.create(BaseState.prototype);
  PrePlayState.prototype.constructor = PrePlayState;

  function selectTopCard(index, needRender){
    var card = this.game.$cribOwner.selectOneFromDeck(this.game.$deck, index);
    this.game.topCard = card;
    if(this.game.$cribOwner.isWinner())
      this.mediator.publish('transition', 'Summary');
    else{
      this.game.$showTopCard = true;
      if(needRender)
        this.render();
      this.mediator.publish('transition', 'Play', true);
    }
  }

  PrePlayState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    if(this.game.$showTopCard)
      templates.deck =  $('#visibleDeckTemplate').html();
    else
      templates.deck =  $('#hiddenStraitDeckTemplate').html();
    return templates;
  };

  PrePlayState.prototype.init = function(){
    this.game.$action = {text: '...'};
    if(this.game.$cribOwner !== this.game.$player1){
      this.mediator.publish('messages-add', 'They will reveal top card');
      var index = Math.floor(Math.random() * this.game.$deck.cards.length);
      this.render();
      selectTopCard.call(this, index, false);
    } else {
      this.mediator.publish('messages-add', 'Reveal top card');
      this.render();
    }
  };

  PrePlayState.prototype.deck = function(cardIndex) {
    selectTopCard.call(this, cardIndex, true);
  };

  return PrePlayState;
});
