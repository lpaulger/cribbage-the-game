define(['gameStates/BaseState'],function(BaseState){
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
    this.game.$showTopCard = true;
    this.game.$action = {text:'Go'};

    setCurrentPlayer.call(this);
    if(this.game.currentPlayer === this.p2)
      processAiTurn.call(this);
    else
      this.game.$messages = ['Select a card to play'];

    setAction.call(this);
  };

  PlayState.prototype.selectCard = function(options) {
    try {
      var points = this.p1.playCard(options.index);
      this.game.currentPlayer = this.p2;
      if(points > 0)
        this.game.$messages = [this.p1.possessive + ' scored ' + points + ' points.'];
      else
        this.game.$messages = ['Their Turn'];
    } catch(e) {
      if(e.message === 'No Playable Cards')
        this.game.$messages = ['No Playable Cards, Press \'Go!\''];
      else if(e.message === 'Invalid Playable Card')
        this.game.$messages = ['Try another card'];
    }
    this.game.transitionTo('Play', true);
  };

  PlayState.prototype.action = function() {
    if(this.nextState === 'Play'){
      try {
        var response = this.p1.announceGo();
        this.game.currentPlayer = this.p2;
        this.game.$messages = [response, 'Their Turn'];
      } catch(e) {
        if(e.message === 'No Playable Cards')
          this.game.$messages = ['No Playable Cards, Press \'Go!\''];
        else if(e.message === 'Playable Cards')
          this.game.$messages = [this.name + ' can\'t go, you have playable cards.'];
      }
    }

    this.game.transitionTo(this.nextState, true);

    if(isEndOfRound.call(this))
      this.nextState = 'Play';
  };

  function setCurrentPlayer(){
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
      var response = this.p2.playCard();
      this.game.currentPlayer = this.p1;
      this.game.$messages = [];
      if(response > 0)
        this.game.$messages.push(this.p2.name + ' scored ' + response + ' points');
      else if(typeof response === 'string'){
        this.game.$messages.push(response);
      }

      this.game.$messages.push('Your Turn.');
    } catch(e){
      console.log(e);
    }
  }

  function setAction(){
    if(isEndOfRound.call(this)){
      this.game.$messages.push('Round Over!');
      this.game.$action = {text:'Ok'};
      this.nextState = 'Count';
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
