define(['gameStates/BaseState'],function(BaseState){
  function DrawState(game){
    BaseState.call(this, game, 'Draw');
  }

  DrawState.prototype = Object.create(BaseState.prototype);
  DrawState.prototype.constructor = DrawState;

  var compareCards = function() {
    if(this.game.$player1.hand.value < this.game.$player2.hand.value){
      return this.game.$player2;
    } else if(this.game.$player1.hand.value > this.game.$player2.hand.value){
      return this.game.$player1;
    } else {
      this.game.$messages = ['it was a tie'];
      return this.game.transitionTo('Draw', true);
    }
  };

  DrawState.prototype.deck = function() {
    this.game.$deck.shuffle();
    this.game.$player1HandVisible = true;
    this.game.$player2HandVisible = true;
    this.game.$player1.hand = this.game.$deck.cut();
    this.game.$player2.hand = this.game.$deck.cut();
    this.game.$cribOwner = compareCards.call(this);
    if(typeof this.game.$cribOwner == "function" ) return this.game.$cribOwner;
    if(!this.game.$cribOwner){
      this.game.$messages = ['It was a Tie, draw again'];
    } else {
      this.game.$messages = [this.game.$cribOwner.name + ' won.'];
    }

    return this.game.transitionTo('Deal', true);
  };

  return DrawState;
});
