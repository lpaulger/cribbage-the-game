define(['gameStates/BaseState'],function(BaseState){
  function DrawState(game){
    BaseState.call(this, game, 'Draw');
    gm = this.game;
    p1 = gm.$player1;
    p2 = gm.$player2;
  }

  DrawState.prototype = Object.create(BaseState.prototype);
  DrawState.prototype.constructor = DrawState;

  var compareCards = function() {
    if(p1.hand.faceValue < p2.hand.faceValue){
      return p2;
    } else if(p1.hand.faceValue > p2.hand.faceValue){
      return p1;
    } else {
      gm.$messages = ['it was a tie'];
      return gm.transitionTo('Draw', true);
    }
  };

  DrawState.prototype.deck = function() {
    gm.$deck.shuffle();
    gm.$player1HandVisible = true;
    gm.$player2HandVisible = true;
    p1.hand = gm.$deck.cut();
    p2.hand = gm.$deck.cut();
    gm.$cribOwner = compareCards.call(this);
    if(typeof gm.$cribOwner == "function" )
      return gm.$cribOwner;
    if(!gm.$cribOwner){
      gm.$messages = ['It was a Tie, draw again'];
      return gm.transitionTo('Draw', true);
    } else {
      gm.$messages = [gm.$cribOwner.name + ' won.'];
      return gm.transitionTo('Deal', true);
    }
  };

  return DrawState;
});
