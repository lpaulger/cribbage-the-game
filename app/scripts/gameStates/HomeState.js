define(['jquery','scripts/gameStates/BaseState', 'scripts/modules/DeckModule'],function($, BaseState, Deck){
  'use strict';

  function HomeState(game){
    BaseState.call(this, game, 'Home');
    this.data = new Deck().shuffle().cards.splice(0,6);
  }

  HomeState.prototype = Object.create(BaseState.prototype);
  HomeState.prototype.constructor = HomeState;

  HomeState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.page =  $('#homeTemplate').html();
    templates.continue = !!this.game ? '<button id="continueGameButton">Continue Game</button>' : '';
    return templates;
  };

  HomeState.prototype.bindEvents = function(){
    $('#newGameButton').on('click', function(){
      this.mediator.publish('start');
    }.bind(this));

    $('#continueGameButton').on('click', function(){
      this.mediator.publish('continue');
    }.bind(this));
  };

  return HomeState;
});
