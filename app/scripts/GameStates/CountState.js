define(['gameStates/BaseState'], function(BaseState){
  function CountState(game){
    BaseState.call(this, game, 'Count');
    gm = this.game;
    p1 = this.game.$player1;
    p2 = this.game.$player2;
  }

  CountState.prototype = Object.create(BaseState.prototype);
  CountState.prototype.constructor = CountState;

  CountState.prototype.init = function(){
    p1.restoreHand();
    p2.restoreHand();

    if(gm.$cribOwner == p1){
      gm.$player2HandVisible = true;
      gm.$player1HandVisible = false;
    } else {
      gm.$player2HandVisible = false;
      gm.$player1HandVisible = true;
    }
  };

  CountState.prototype.action = function(){
    if(gm.$cribOwner == p1){
      gm.$player2HandVisible = false;
      gm.$player1HandVisible = true;
      p2.hand = [];
    } else {
      gm.$player2HandVisible = true;
      gm.$player1HandVisible = false;
      p1.hand = [];
    }
  };

  return CountState;
});