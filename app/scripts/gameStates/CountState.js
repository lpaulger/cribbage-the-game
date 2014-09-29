define(['gameStates/BaseState'], function(BaseState){
  'use strict';
  function CountState(game){
    BaseState.call(this, game, 'Count');
    this.step = 0;
  }


  CountState.prototype = Object.create(BaseState.prototype);
  CountState.prototype.constructor = CountState;

  CountState.prototype.init = function(){
    this.p1.restoreHand();
    this.p2.restoreHand();

    if(isPlayerOneCribOwner.call(this)){
      showPlayerTwoHand.call(this);
      this.game.$messages = [this.p2.name + ' Score: '];
    } else {
      showPlayerOneHand.call(this);
      this.game.$messages = [this.p1.name + ' Score: '];
    }
  };

  CountState.prototype.action = function(){
    if(this.step === 0){
      if(isPlayerOneCribOwner.call(this)){
        showPlayerOneHand.call(this);
        this.p2.hand = [];
      } else {
        showPlayerTwoHand.call(this);
        this.p1.hand = [];
      }
      this.step += 1;
    } else if(this.step === 1) {
      this.game.$cribOwner.hand = this.game.$cribOwner.crib;
      this.game.$cribOwner.crib = [];
      this.game.$actionText = 'Next Round';
      this.step += 1;
    } else {
      if(isPlayerOneCribOwner.call(this)){
        this.game.$cribOwner = this.p2;
      } else {
        this.game.$cribOwner = this.p1;
      }
      showPlayerOneHand.call(this);
      this.game.transitionTo('Deal', true);
      this.game.$showTopCard = false;
      this.step = 0;
    }
  };

  function isPlayerOneCribOwner() {
    return this.game.$cribOwner === this.p1;
  }

  function showPlayerOneHand() {
    this.game.$player2HandVisible = false;
    this.game.$player1HandVisible = true;
  }

  function showPlayerTwoHand() {
    this.game.$player2HandVisible = true;
    this.game.$player1HandVisible = false;
  }

  return CountState;
});