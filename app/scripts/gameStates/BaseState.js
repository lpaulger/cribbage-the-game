define(['jquery', 'mustache', 'scripts/modules/PubSub'],function($, mustache, PubSub){
  'use strict';
  function BaseState(game, name){
    this.game = game;
    this.name = name;
    this.mediator = PubSub;
    if(game){
      this.p1 = game.$player1;
      this.p2 = game.$player2;
      this.data = this.game;
    }
  }

  BaseState.prototype.templates = function(){
    return {
      page: $('#stateTemplate').html(),
      p1Hand: $('#visibleHandTemplate').html(),
      p2Hand: $('#hiddenHandTemplate').html(),
      p1Score: $('#p1ScoreTemplate').html(),
      p2Score: $('#p2ScoreTemplate').html(),
      board: $('#scoreboardTemplate').html(),
      play: $('#playTemplate').html(),
      deck: $('#hiddenDeckTemplate').html(),
      crib: $('#hiddenHandTemplate').html(),
      controls: '<button style="display:{{display}}">{{text}}</button>',
      messages: '{{#$messages}}<li>{{.}}</li>{{/$messages}}'
    };
  };

  BaseState.prototype.init = function() {
    this.render();
  };

  BaseState.prototype.deck = function() {
    this.render();
  };

  BaseState.prototype.selectCard = function() {
    this.render();
  };

  BaseState.prototype.action = function() {
    this.render();
  };

  BaseState.prototype.render = function() {
    var rendered = mustache.render(this.templates().page, this.data, this.templates());
    $('#content').html(rendered);
    this.bindEvents();
    this.mediator.publish('render', this.name, this.game);
    this.mediator.publish('messages-clear');
  };

  BaseState.prototype.renderOnly = function(){
    this.render();
    this.unbindEvents();
  };

  BaseState.prototype.bindEvents = function(){
    $('#deck').on('click', function(e){
      this.unbindEvents();
      var cardIndex = $($(e.currentTarget).children('ul')[0]).children('li').children('a').index(e.target);
      $(e.target).addClass('selected');
      this.deck(cardIndex);
    }.bind(this));

    $('#bottomHand').on('click', 'li', function(event){
      this.unbindEvents();
      var index = $('#bottomHand').find('li').index(event.currentTarget);
      var card = $(event.currentTarget).find('a');
      this.selectCard({index: index, card: card, event: event});
    }.bind(this));

    $('#controls').on('click', 'button', function(){
      this.unbindEvents();
      this.action();
    }.bind(this));
  };

  BaseState.prototype.unbindEvents = function(){
    $('#deck').off('click');
    $('#bottomHand').off('click', 'li');
    $('#controls').off('click', 'button');
  };

  return BaseState;
});
