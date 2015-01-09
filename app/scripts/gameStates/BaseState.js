define(['jquery', 'mustache', 'modules/PubSub',
  'text!templates/game.html', 'text!templates/game.visibleHand.html', 'text!templates/game.hiddenHand.html',
  'text!templates/game.hiddenDeck.html', 'text!templates/game.play.html', 'text!templates/game.scoreboard.html',
  'text!templates/game.controls.html'],
  function($, mustache, PubSub, gameHtml, visibleHandHtml, hiddenHandHtml, hiddenDeckHtml, playHtml, scoreboardHtml, controlsHtml){
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
      page: gameHtml,
      p1Hand: visibleHandHtml,
      p2Hand: hiddenHandHtml,
      p1Score: scoreboardHtml,
      p2Score: scoreboardHtml,

      play: playHtml,
      deck: hiddenDeckHtml,
      crib: hiddenHandHtml,
      controls: controlsHtml,
      scoreControl: '',
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
      var cardIndex = $('#deck ul').children().indexOf(e.target.parentNode);
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

    $(document).off('backbutton').on('backbutton', function(){
      this.mediator.publish('transition', 'Home');
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
