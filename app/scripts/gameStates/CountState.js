define(['jquery', 'gameStates/BaseState', 'modules/CountScoreKeeper'], function($, BaseState, ScoreKeeper){
  'use strict';
  function CountState(game){
    BaseState.call(this, game, 'Count');
    /*
     Step - Description
     0  - Pone counts hand
     1  - Dealer counts hand
     2  - Dealer counts crib
     */
    game.countStateStep = game.countStateStep || 0;
    this.isScorePoints = false;
    this.p1.maxPoints = 29;
    this.p1.availablePoints = setAvailablePoints(this.p1.maxPoints);
    this.scoreKeeper = new ScoreKeeper();
  }

  CountState.prototype = Object.create(BaseState.prototype);
  CountState.prototype.constructor = CountState;

  CountState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.deck = $('#visibleDeckTemplate').html();
    templates.p2Hand = $('#visibleHandTemplate').html();
    if(this.isScorePoints)
      templates.scoreControl = $('#scoreControlTemplate').html();
    return templates;
  };

  CountState.prototype.updateScoreControl = function(value){
    this.p1.selectedScore = value;
  };


  CountState.prototype.init = function(){
    this.p1.restoreHand();
    this.p2.restoreHand();
    if(this.game.countStateStep === 0)
      processCountStep.call(this);

    else {
      this.render();
    }
  };

  CountState.prototype.action = function(){
    if(this.isScorePoints){
      this.game.countStateStep--;//hack to fix auto incriment
    }

    processCountStep.call(this);
  };

  CountState.prototype.bindEvents = function(){
    //bind defaults
    BaseState.prototype.bindEvents.call(this);

    $('#scoreControl input[type=range]').on('input change', function(event){
      this.updateScoreControl(event.srcElement.valueAsNumber);
      $('#scoreControl span').html(event.srcElement.valueAsNumber);
    }.bind(this));
  };

  function setAvailablePoints(size){
    var i = 0;
    var arrayPoints = [];
    while(i < size){
      i++;
      arrayPoints.push(i);
    }
    return arrayPoints;
  }

  function processCountStep(){
    var points = 0;
    if(this.game.countStateStep === 0)
      processFirstStep.call(this, points);
    else if(this.game.countStateStep === 1)
      processSecondStep.call(this, points);
    else if(this.game.countStateStep === 2)
      processThirdStep.call(this);
    else
      processEndOfCount.call(this);
  }

  function processFirstStep(points){
    if(isPlayerOneCribOwner.call(this)){
      evaluatePlayerTwoScore.call(this, points);
    } else {
      evaluatePlayerOneScore.call(this, points);
    }
    this.game.countStateStep += 1;
    this.render();
  }

  function processSecondStep(points){
    if(isPlayerOneCribOwner.call(this)){
      evaluatePlayerOneScore.call(this, points);
      this.p2.hand = [];
    } else {
      evaluatePlayerTwoScore.call(this, points);
      this.p1.hand = [];
    }
    this.game.countStateStep += 1;
    this.render();
  }

  function processThirdStep(){
    this.game.$cribOwner.hand = this.game.$cribOwner.crib;
    this.game.$cribOwner.crib = [];
    this.scoreKeeper.evaluateHand(this.game.$cribOwner, this.game.topCard);
    this.game.$action = {text:'Cont.'};
    this.game.countStateStep += 1;
    this.render();
  }

  function processEndOfCount(){
    if(isPlayerOneCribOwner.call(this)){
      this.game.$cribOwner = this.p2;
    } else {
      this.game.$cribOwner = this.p1;
    }
    showPlayerOneHand.call(this);
    this.game.$showTopCard = false;
    this.game.countStateStep = 0;
    this.render();
    if(this.p1.isWinner() || this.p2.isWinner())
      this.mediator.publish('transition', 'Summary', true);
    else {
      this.mediator.publish('transition', 'Deal');
    }
  }


  function evaluatePlayerOneScore(points){
    showPlayerOneHand.call(this);
    if(!this.isScorePoints){
      this.scoreKeeper.evaluateHand(this.p1, this.game.topCard);
      if(this.p1.isWinner())
        this.mediator.publish('transition', 'Summary', true);
    }
    return points;
  }

  function evaluatePlayerTwoScore(points){
    showPlayerTwoHand.call(this);
    this.scoreKeeper.evaluateHand(this.p2, this.game.topCard);
    if(this.p2.isWinner())
      this.mediator.publish('transition', 'Summary', true);
    return points;
  }

  function isPlayerOneCribOwner(){
    return this.game.$cribOwner === this.p1;
  }

  function showPlayerOneHand(){
    this.game.$player2HandVisible = false;
    this.game.$player1HandVisible = true;
    if(this.game.settings.countPointsManually){
      this.isScorePoints = this.isScorePoints ? false : true;
      this.p1.selectedScore = 0;
    }
  }

  function showPlayerTwoHand(){
    this.game.$player2HandVisible = true;
    this.game.$player1HandVisible = false;
  }

  return CountState;
});
