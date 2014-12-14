define(['jquery','gameStates/BaseState'],function($, BaseState){
  'use strict';
  function PlayState(game){
    BaseState.call(this, game, 'Play');
    this.nextState = 'Play';
  }

  PlayState.prototype = Object.create(BaseState.prototype);
  PlayState.prototype.constructor = PlayState;

  PlayState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.deck =  $('#visibleDeckTemplate').html();
    return templates;
  };

  PlayState.prototype.init = function(){
    this.game.$action = {text:'...'};
    if(!this.p1.playRules.hasPlayableCards(this.p1))
      this.game.$action = {text:'Go'};

    if(!isEndOfRound.call(this)){
      setInitialCurrentPlayer.call(this);
      if(this.game.currentPlayer === this.p2)
        processAiTurn.call(this);
      else
        this.mediator.publish('messages-add', this.p1.possessive + ' turn');
    }

    setAction.call(this);

    this.render();
  };

  PlayState.prototype.selectCard = function(options) {
    try {
      this.p1.selectCard(options.index);
      this.mediator.publish('messages-add', 'Tap OK to continue');
      this.game.$action = {text:'Ok'};
      this.render();

      //playCard.call(this, options.index);

    } catch(e) {
      if(e.message === 'No Playable Cards')
        this.mediator.publish('messages-add', 'No Playable Cards, Press \'Go!\'');
      else if(e.message === 'Invalid Playable Card')
        this.mediator.publish('messages-add', 'Try another card');

      this.mediator.publish('transition', 'Play', false);
    }
  };

  PlayState.prototype.action = function() {
    if(this.nextState === 'Count'){
      this.mediator.publish('board-clear');
      this.mediator.publish('transition', this.nextState, false);
      this.nextState = 'Play';
    } else {
      if(!this.p1.playRules.hasPlayableCards(this.p1)){
        this.p1.announceGo();
        switchPlayer.call(this);
      }
      else{
        var index = this.p1.hand.indexOf(this.p1.getSelectedCards()[0]);
        if(index !== -1)
          playCard.call(this, index);
        else {
          this.mediator.publish('messages-add', 'Select a card first');
        }
      }

      finishTurn.call(this);
    }
  };

  function finishTurn(){
    if(this.p1.isWinner())
      this.mediator.publish('transition', 'Summary', true);
    else if(!isEndOfRound.call(this)){
      this.renderOnly();
      this.nextState = 'Play';
      this.mediator.publish('transition', 'Play', true);
    } else {
      this.mediator.publish('transition', 'Play', false);
    }
  }

  function playCard(index){
    this.p1.playCard(index);
    switchPlayer.call(this);
  }

  function switchPlayer(){
    this.game.currentPlayer = this.p2;
    if(!isEndOfRound.call(this)){
      this.mediator.publish('messages-add', this.p2.possessive + ' turn');
      this.game.$action = {text:'...'};
    }
  }


  function setInitialCurrentPlayer(){
    if(!this.game.currentPlayer){
      if(this.game.$cribOwner === this.p1){
        this.game.currentPlayer = this.p2;
      } else {
        this.game.currentPlayer = this.p1;
      }
    }
  }

  function processAiTurn(){
    try{
      this.p2.playCard();
      this.game.currentPlayer = this.p1;
      if(!isEndOfRound.call(this)){
        this.mediator.publish('messages-add', this.p1.possessive + ' turn');
        this.game.$action = {text:'...'};
      }
      if(this.p2.isWinner())
        this.mediator.publish('transition', 'Summary', true);
    } catch(e){
      console.log(e);
    }
  }

  function setAction(){
    if(isEndOfRound.call(this)){
      this.mediator.publish('messages-add', 'Round over!');
      this.game.$action = {text:'Ok'};
      this.nextState = 'Count';
      this.game.currentPlayer = undefined;
    }
    else if(!this.p1.playRules.hasPlayableCards(this.p1))
    {
      this.game.$action = {text:'Go'};
    }
  }

  function isEndOfRound(){
    return this.p1.hand.length === 0 && this.p2.hand.length === 0;
  }

  return PlayState;
});
