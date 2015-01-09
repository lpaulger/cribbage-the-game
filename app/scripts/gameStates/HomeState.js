define(['jquery','gameStates/BaseState', 'modules/DeckModule', 'text!templates/home.html'],function($, BaseState, Deck, homeHtml){
  'use strict';

  function HomeState(game){
    BaseState.call(this, game, 'Home');
    this.data = new Deck().shuffle().cards.splice(0,6);
  }

  HomeState.prototype = Object.create(BaseState.prototype);
  HomeState.prototype.constructor = HomeState;

  HomeState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.page =  homeHtml;
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

    $('a.settings-link').on('click', function(){
      this.mediator.publish('transition', 'Settings');
    }.bind(this));

    $(document).off('backbutton').on('backbutton', function(){
      this.mediator.publish('transition', 'Back');
    }.bind(this));
  };

  return HomeState;
});
