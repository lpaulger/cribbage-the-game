define(['gameStates/BaseState', 'modules/DeckModule'],function(BaseState, Deck){
  'use strict';
  function DealState(game){
    BaseState.call(this, game, 'Deal');
    this.game.$deck = new Deck();
  }

  DealState.prototype = Object.create(BaseState.prototype);
  DealState.prototype.constructor = DealState;

  DealState.prototype.init = function(){
    this.game.$player2HandVisible = this.game.options.showOpponentsHand;
    this.game.$deck.shuffle();
    var hands = this.game.$deck.deal();
    this.p1.hand = hands.bottomHand.sort(sortByValue);
    this.p2.hand = hands.topHand.sort(sortByValue);

    this.game.$messages = ['select two cards for ' + this.game.$cribOwner.possessive + ' crib'];
    this.game.$actionText = 'Select';

    return this.game.transitionTo('Crib');
  };

  function sortByValue(a,b){
    return a.faceValue > b.faceValue;
  }

  return DealState;
});
