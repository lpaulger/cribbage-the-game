define(['gameStates/BaseState', 'modules/DeckModule'],function(BaseState, Deck){
  function DealState(game){
    BaseState.call(this, game, 'Deal');
  }

  DealState.prototype = Object.create(BaseState.prototype);
  DealState.prototype.constructor = DealState;

  DealState.prototype.init = function(){
    this.game.$player2HandVisible = false;
    this.game.$deck = new Deck();
    this.game.$deck.shuffle();
    var hands = this.game.$deck.deal();

    this.game.$player1.hand = hands.bottomHand.sort(sortByValue);
    this.game.$player2.hand = hands.topHand.sort(sortByValue);
    this.game.$messages = ['select two cards for ' + this.game.$cribOwner.possesive + ' crib'];
    this.game.$actionText = "Select";

    return this.game.transitionTo('Crib');
  };

  DealState.prototype.deck = function() {

  };

  function sortByValue(a,b){
    return a.value > b.value;
  }

  return DealState;
});
