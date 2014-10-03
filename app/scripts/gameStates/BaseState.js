define(['jquery', 'mustache'],function($, mustache){
  'use strict';
  function BaseState(game, name){
    this.game = game;
    this.name = name;
    this.p1 = game.$player1;
    this.p2 = game.$player2;
  }

  BaseState.prototype.templates = function(){
    return {
      p1Hand: $('#visibleHandTemplate').html(),
      p2Hand: $('#hiddenHandTemplate').html(),
      p1Score: $('#scoreboardTemplate').html(),
      p2Score: $('#scoreboardTemplate').html(),
      play: $('#playTemplate').html(),
      deck: $('#hiddenDeckTemplate').html(),
      crib: $('#hiddenHandTemplate').html(),
      controls: '<button style="display:{{display}}">{{text}}</button>',
      messages: '{{#$messages}}<li>{{.}}</li>{{/$messages}}'
    };
  };

  BaseState.prototype.init = function() {};

  BaseState.prototype.deck = function() {};

  BaseState.prototype.selectCard = function() {};

  BaseState.prototype.action = function() {};

  BaseState.prototype.render = function() {
    var rendered = mustache.render($('#stateTemplate').html(), this.game, this.templates());
    $('#content').html(rendered);
    $('#deck').on('click', function(e){
      var cardIndex = $($(e.currentTarget).children('ul')[0]).children('li').children('a').index(e.target);
      $(e.target).addClass('selected');
      this.deck(cardIndex);
    }.bind(this));

    $('#bottomHand').on('click', 'li', function(event){
      var index = $('#bottomHand').find('li').index(event.currentTarget);
      var card = $(event.currentTarget).find('a');
      this.selectCard({index: index, card: card, event: event});
    }.bind(this));

    $('#controls').on('click', 'button', this.action.bind(this));
  };

  return BaseState;
});