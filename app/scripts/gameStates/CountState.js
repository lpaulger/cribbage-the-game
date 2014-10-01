define(['gameStates/BaseState', 'modules/CountScoreKeeperSingleton'], function(BaseState, ScoreKeeper){
  'use strict';
  function CountState(game){
    BaseState.call(this, game, 'Count');
    this.step = 0;
    this.scoreKeeper = ScoreKeeper.getInstance();
  }


  CountState.prototype = Object.create(BaseState.prototype);
  CountState.prototype.constructor = CountState;

  CountState.prototype.init = function(){
    this.p1.restoreHand();
    this.p2.restoreHand();
    var points = 0;
    if(isPlayerOneCribOwner.call(this)){
      showPlayerTwoHand.call(this);
      this.p2.points += points = this.scoreKeeper.evaluateHand(this.p2, this.game.topCard);
      this.game.$messages = [this.p2.name + ' scored ' + points + ' points.'];
    } else {
      showPlayerOneHand.call(this);
      this.p1.points += points = this.scoreKeeper.evaluateHand(this.p1, this.game.topCard);
      this.game.$messages = [this.p1.name + ' scored ' + points + ' points.'];
    }
  };

  CountState.prototype.action = function(){
    var points = 0;
    if(this.step === 0){
      if(isPlayerOneCribOwner.call(this)){
        showPlayerOneHand.call(this);
        this.p1.points += points = this.scoreKeeper.evaluateHand(this.p1, this.game.topCard);
        this.game.$messages = [this.p1.name + ' scored ' + points + ' points.'];
        this.p2.hand = [];
      } else {
        showPlayerTwoHand.call(this);
        this.p2.points += points = this.scoreKeeper.evaluateHand(this.p2, this.game.topCard);
        this.game.$messages = [this.p2.name + ' scored ' + points + ' points.'];
        this.p1.hand = [];
      }
      points = 0;
      this.step += 1;
    } else if(this.step === 1) {
      this.game.$cribOwner.hand = this.game.$cribOwner.crib;
      this.game.$cribOwner.crib = [];
      this.game.$cribOwner.points += points = this.scoreKeeper.evaluateHand(this.game.$cribOwner, this.game.topCard);
      this.game.$messages = [this.game.$cribOwner.name + '\'s crib scored ' + points + ' points.'];
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