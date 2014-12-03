define(['jquery', 'mustache', 'modules/PubSub'],function($, mustache, PubSub){
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
      p1Score: $('#scoreboardTemplate').html(),
      p2Score: $('#scoreboardTemplate').html(),

      play: $('#playTemplate').html(),
      deck: $('#hiddenDeckTemplate').html(),
      crib: $('#hiddenHandTemplate').html(),
      controls: $('#controlsTemplate').html(),
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

  function calculatePegPosition(points){
    if(points < 31)
      return points;
    if(points >= 31 && points < 61)
      return (61 - (points - 30));
    else if(points >= 61 && points < 91)
      return points - 60;
    else if(points >= 91 && points <121)
      return (61 - (points - 90));
    else
      return 0;
  }

  function renderBoardPegs(data){
    var p1 = {
      leadPoint: calculatePegPosition(data.$player1.points),
      currentPoint: calculatePegPosition(data.$player1.currentPoints)
    };
    var p2 = {
      leadPoint: calculatePegPosition(data.$player2.points),
      currentPoint: calculatePegPosition(data.$player2.currentPoints)
    };
    $('#cribbageBoard ul:first-of-type li:nth-child(' + p2.leadPoint + ')').addClass('player2-board-peg');
    $(' #cribbageBoard ul:first-of-type li:nth-child(' + p2.currentPoint + ')').addClass('player2-board-peg');

    $('#cribbageBoard ul:nth-of-type(2) li:nth-child(' + p1.leadPoint + ')').addClass('player1-board-peg');
    $(' #cribbageBoard ul:nth-of-type(2) li:nth-child(' + p1.currentPoint + ')').addClass('player1-board-peg');
  }

  BaseState.prototype.render = function() {
    var rendered = mustache.render(this.templates().page, this.data, this.templates());
    $('#content').html(rendered);
    this.bindEvents();
    this.mediator.publish('render', this.name, this.game);
    this.mediator.publish('messages-clear');
    if(this.data && this.data.$player1)
      renderBoardPegs(this.data);
  };

  BaseState.prototype.renderOnly = function(){
    this.render();
    this.unbindEvents();
  };

  BaseState.prototype.bindEvents = function(){
    $('#deck').on('click', function(e){
      this.unbindEvents();
      var cardIndex = [].slice.call(e.target.parentNode.children).indexOf(e.target);
      $(e.target).addClass('selected');
      this.deck(cardIndex);
    }.bind(this));

    $('#bottomHand').on('click', function(event){
      this.unbindEvents();
      var listItem = event.target;
      var card;
      while(listItem.nodeName !== 'LI'){
        if(listItem.nodeName === 'A')
          card = listItem;

        listItem = listItem.parentNode;
      }

      var index = [].slice.call($('#bottomHand').children()).indexOf(listItem);
      this.selectCard({index: index, card: card, event: event});
    }.bind(this));

    $('#controls button').on('click', function(){
      this.unbindEvents();
      this.action();
    }.bind(this));

    $('a.home-link').on('click', function(){
      this.mediator.publish('transition', 'Home');
    }.bind(this));

    $('a.help-link').on('click', function(){
      this.mediator.publish('transition', 'Info');
    }.bind(this));

    $('a.back-link').on('click', function(){
      this.mediator.publish('transition', 'Back');
    }.bind(this));
  };

  BaseState.prototype.unbindEvents = function(){
    $('#deck').off('click');
    $('#bottomHand').off('click');
    $('#controls').off('click', 'button');
    $('a.home-link').off('click');
  };

  return BaseState;
});
