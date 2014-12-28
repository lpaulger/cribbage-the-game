define(['gameStates/BaseState', 'text!templates/game.visibleHand.html'],function(BaseState, visibleHandHtml){
  'use strict';
  function DrawState(game){
    BaseState.call(this, game, 'Draw');
  }

  DrawState.prototype = Object.create(BaseState.prototype);
  DrawState.prototype.constructor = DrawState;

  var compareCards = function() {
    if(this.p1.crib[0].faceValue < this.p2.crib[0].faceValue){
      return this.p1;
    } else if(this.p1.crib[0].faceValue > this.p2.crib[0].faceValue){
      return this.p2;
    }
  };

  DrawState.prototype.init = function(){
    this.mediator.publish('messages-add', 'Click the deck to start');
    this.render();
  };

  DrawState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.crib = visibleHandHtml;
    return templates;
  };

  DrawState.prototype.deck = function() {
    this.game.$deck.shuffle();
    this.game.$player1HandVisible = true;
    this.game.$player2HandVisible = true;
    this.p1.crib = [this.game.$deck.cut()];
    this.p2.crib = [this.game.$deck.cut()];
    this.game.$cribOwner = compareCards.call(this);
    if(!this.game.$cribOwner){
      this.mediator.publish('messages-add', 'It was a tie, draw again');
      this.render();

    } else {
      this.mediator.publish('messages-add', this.game.$cribOwner.name + ' won');
      this.renderOnly();
      this.mediator.publish('transition', 'Deal', true);
    }

    this.p1.crib = [];
    this.p2.crib = [];
  };

  return DrawState;
});
