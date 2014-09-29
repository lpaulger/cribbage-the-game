define(['gameStates/BaseState'],function(BaseState){
  'use strict';
  function DrawState(game){
    BaseState.call(this, game, 'Draw');
  }

  DrawState.prototype = Object.create(BaseState.prototype);
  DrawState.prototype.constructor = DrawState;

  var compareCards = function() {
    if(this.p1.hand.faceValue < this.p2.hand.faceValue){
      return this.p2;
    } else if(this.p1.hand.faceValue > this.p2.hand.faceValue){
      return this.p1;
    } else {
      this.game.$messages = ['it was a tie'];
      return this.game.transitionTo('Draw', true);
    }
  };

  DrawState.prototype.deck = function() {
    this.game.$deck.shuffle();
    this.game.$player1HandVisible = true;
    this.game.$player2HandVisible = true;
    this.p1.hand = this.game.$deck.cut();
    this.p2.hand = this.game.$deck.cut();
    this.game.$cribOwner = compareCards.call(this);
    if(typeof this.game.$cribOwner === 'function' )
      return this.game.$cribOwner;
    if(!this.game.$cribOwner){
      this.game.$messages = ['It was a Tie, draw again'];
      return this.game.transitionTo('Draw', true);
    } else {
      this.game.$messages = [this.game.$cribOwner.name + ' won.'];
      return this.game.transitionTo('Deal', true);
    }
  };

  return DrawState;
});
