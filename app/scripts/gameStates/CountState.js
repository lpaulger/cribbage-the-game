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

    if(isHumanCribOwner()){
      showBotPlayerHand();
      gm.$messages = [p2.name + ' Score: '];
    } else {
      showHumanPlayerHand();
      gm.$messages = [p1.name + ' Score: '];
    }
  };

  CountState.prototype.action = function(){
    if(this.step == 0){
      if(isHumanCribOwner()){
        showHumanPlayerHand();
        p2.hand = [];
      } else {
        showBotPlayerHand();
        p1.hand = [];
      }
      this.step += 1;
    } else if(this.step == 1) {
      gm.$cribOwner.hand = gm.$cribOwner.crib;
      gm.$cribOwner.crib = [];
      gm.$actionText = 'Next Round';
      this.step += 1;
    } else {
      if(isHumanCribOwner()){
        gm.$cribOwner = p2;
      } else {
        gm.$cribOwner = p1;
      }
      showHumanPlayerHand();
      gm.transitionTo('Deal', true);
      this.step = 0;
    }
  };

  function isHumanCribOwner() {
    return gm.$cribOwner == p1;
  }

  function showHumanPlayerHand() {
    gm.$player2HandVisible = false;
    gm.$player1HandVisible = true;
  }

  function showBotPlayerHand() {
    gm.$player2HandVisible = true;
    gm.$player1HandVisible = false;
  }

  return CountState;
});