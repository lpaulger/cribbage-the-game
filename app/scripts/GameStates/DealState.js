define(['gameStates/BaseState', 'modules/DeckModule'],function(BaseState, Deck){
  function DealState(game){
    BaseState.call(this, game, 'Deal');
    gm = this.game;
    p1 = this.game.$player1;
    p2 = this.game.$player2;
  }

  DealState.prototype = Object.create(BaseState.prototype);
  DealState.prototype.constructor = DealState;

  DealState.prototype.init = function(){
    gm.$player2HandVisible = gm.options.showOpponentsHand;
    gm.$deck = new Deck();
    gm.$deck.shuffle();

    var hands = gm.$deck.deal();
    p1.hand = hands.bottomHand.sort(sortByValue);
    p2.hand = hands.topHand.sort(sortByValue);

    gm.$messages = ['select two cards for ' + gm.$cribOwner.possesive + ' crib'];
    gm.$actionText = "Select";

    return gm.transitionTo('Crib');
  };

  DealState.prototype.deck = function() {

  };

  function sortByValue(a,b){
    return a.faceValue > b.faceValue;
  }

  return DealState;
});
