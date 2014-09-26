define(['gameStates/BaseState'], function(BaseState){
  function CountState(game){
    BaseState.call(this, game, 'Count');
    gm = this.game;
    p1 = this.game.$player1;
    p2 = this.game.$player2;
    this.step = 0;
  }


  CountState.prototype = Object.create(BaseState.prototype);
  CountState.prototype.constructor = CountState;

  CountState.prototype.init = function(){
    p1.restoreHand();
    p2.restoreHand();

    if(isPlayerOneCribOwner()){
      showPlayerTwoHand();
      gm.$messages = [p2.name + ' Score: '];
    } else {
      showPlayerOneHand();
      gm.$messages = [p1.name + ' Score: '];
    }
  };

  CountState.prototype.action = function(){
    if(this.step == 0){
      if(isPlayerOneCribOwner()){
        showPlayerOneHand();
        p2.hand = [];
      } else {
        showPlayerTwoHand();
        p1.hand = [];
      }
      this.step += 1;
    } else if(this.step == 1) {
      gm.$cribOwner.hand = gm.$cribOwner.crib;
      gm.$cribOwner.crib = [];
      gm.$actionText = 'Next Round';
      this.step += 1;
    } else {
      if(isPlayerOneCribOwner()){
        gm.$cribOwner = p2;
      } else {
        gm.$cribOwner = p1;
      }
      showPlayerOneHand();
      gm.transitionTo('Deal', true);
      gm.$showTopCard = false;
      this.step = 0;
    }
  };

  function isPlayerOneCribOwner() {
    return gm.$cribOwner == p1;
  }

  function showPlayerOneHand() {
    gm.$player2HandVisible = false;
    gm.$player1HandVisible = true;
  }

  function showPlayerTwoHand() {
    gm.$player2HandVisible = true;
    gm.$player1HandVisible = false;
  }

  return CountState;
});