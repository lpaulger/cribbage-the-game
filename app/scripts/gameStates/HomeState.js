define(['jquery','scripts/gameStates/BaseState', 'scripts/modules/DeckModule'],function($, BaseState, Deck){
  'use strict';

  function HomeState(){
    BaseState.call(this, undefined, 'Home');
    this.data =  new Deck().shuffle().cards.splice(0,6);
  }

  HomeState.prototype = Object.create(BaseState.prototype);
  HomeState.prototype.constructor = HomeState;

  HomeState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.page =  $('#homeTemplate').html();
    return templates;
  };

  HomeState.prototype.bindEvents = function(){
    $('#newGameButton').on('click', function(){
      this.mediator.publish('start');
    }.bind(this));
  };

  return HomeState;
});
