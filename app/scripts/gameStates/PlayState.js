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
    this.game.$action = {text:'Go'};

    if(!isEndOfRound.call(this)){
      setInitialCurrentPlayer.call(this);
      if(this.game.currentPlayer === this.p2)
        processAiTurn.call(this);
    }

    setAction.call(this);

    this.render();
  };

  PlayState.prototype.selectCard = function(options) {
    try {
      this.p1.playCard(options.index);
      switchPlayer.call(this);

      if(this.p1.isWinner())
        this.mediator.publish('transition', 'Summary', true);
      else if(!isEndOfRound.call(this)){
        this.renderOnly();
        this.mediator.publish('transition', 'Play', true);
      } else {
        this.mediator.publish('transition', 'Play', false);
      }
    } catch(e) {
      if(e.message === 'No Playable Cards')
        this.mediator.publish('messages-add', 'No Playable Cards, Press \'Go!\'');
      else if(e.message === 'Invalid Playable Card')
        this.mediator.publish('messages-add', 'Try another card');

      this.mediator.publish('transition', 'Play', false);
    }
  };

  PlayState.prototype.action = function() {
    if(this.nextState === 'Play'){
      try {
        this.p1.announceGo();
        switchPlayer.call(this);
      } catch(e) {
        if(e.message === 'Playable Cards')
          this.mediator.publish('messages-add', 'You can\'t go, you have playable cards.');
      }
    } else {
      this.mediator.publish('board-clear');
    }

    this.renderOnly();
    if(this.p1.isWinner())
      this.mediator.publish('transition', 'Summary', false);
    else
      this.mediator.publish('transition', this.nextState, true);

    if(isEndOfRound.call(this))
      this.nextState = 'Play';
  };
  function switchPlayer(){
    this.game.currentPlayer = this.p2;
    if(!isEndOfRound.call(this))
      this.mediator.publish('messages-add', this.p2.possessive + ' turn');
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
      if(!isEndOfRound.call(this))
        this.mediator.publish('messages-add', this.p1.possessive + ' turn');
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
