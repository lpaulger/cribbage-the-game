define(['gameStates/BaseState', 'modules/DeckModule',
  'text!templates/game.visibleHand.html'],
  function(BaseState, Deck, visibleHandHtml){
  'use strict';
  function DealState(game){
    BaseState.call(this, game, 'Deal');
    this.game.$deck = new Deck();
  }

  DealState.prototype = Object.create(BaseState.prototype);
  DealState.prototype.constructor = DealState;

  DealState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.p2Hand = visibleHandHtml;
    return templates;
  };

  DealState.prototype.init = function(){
    this.game.$action = {text: '...'};
    this.mediator.publish('messages-add', 'Dealing cards');
    this.renderOnly();
    this.game.$player2HandVisible = false;
    this.game.$deck.shuffle();
    var hands = this.game.$deck.deal();
    this.p1.hand = hands.bottomHand.sort(sortByValue);
    this.p2.hand = hands.topHand.sort(sortByValue);

    this.mediator.publish('transition', 'Crib', true);
  };

  function sortByValue(a,b){
    return a.faceValue - b.faceValue;
  }

  return DealState;
});
