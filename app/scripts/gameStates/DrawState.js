define(['jquery','gameStates/BaseState'],function($, BaseState){
  'use strict';
  function DrawState(game){
    BaseState.call(this, game, 'Draw');
  }

  DrawState.prototype = Object.create(BaseState.prototype);
  DrawState.prototype.constructor = DrawState;

  var compareCards = function() {
    if(this.p1.hand[0].faceValue < this.p2.hand[0].faceValue){
      return this.p2;
    } else if(this.p1.hand[0].faceValue > this.p2.hand[0].faceValue){
      return this.p1;
    } else {
      this.mediator.publish('messages-add', 'it was a tie');
      this.mediator.publish('transition', 'Draw', true);
    }
  };

  DrawState.prototype.init = function(){
    this.mediator.publish('messages-add', 'Click the Deck to Start');
    this.render();
  }

  DrawState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.p2Hand = $('#visibleHandTemplate').html();
    return templates;
  };

  DrawState.prototype.deck = function() {
    this.game.$deck.shuffle();
    this.game.$player1HandVisible = true;
    this.game.$player2HandVisible = true;
    this.p1.hand = [this.game.$deck.cut()];
    this.p2.hand = [this.game.$deck.cut()];
    this.game.$cribOwner = compareCards.call(this);
    if(!this.game.$cribOwner){
      this.mediator.publish('messages-add', 'It was a Tie, draw again');
      this.mediator.publish('transition', 'Draw', true);
    } else {
      this.mediator.publish('messages-add', this.game.$cribOwner.name + ' won.');
      this.mediator.publish('transition', 'Deal', true);
    }

    this.render();
  };

  return DrawState;
});
