define(['gameStates/BaseState'],function(BaseState){
  'use strict';
  function CribState(game){
    BaseState.call(this, game, 'Crib');
  }

  CribState.prototype = Object.create(BaseState.prototype);
  CribState.prototype.constructor = CribState;

  CribState.prototype.init = function(){
    this.game.$action = {text: 'Pick'};
    this.mediator.publish('messages-add', 'Pick two cards for ' + this.game.$cribOwner.possessive + ' crib');

    if(this.p2.hand.length === 6){
      this.p2.placeCardsInCrib(this.game.$cribOwner);
      this.p2.handInMemory = this.p2.hand.slice();
    }
    this.render();
  };

  CribState.prototype.selectCard = function(options) {
    function replaceOldCard(){
      _hand[_hand.indexOf(selectedCards[0])].selected = '';
      _hand[options.index].selected = 'selected';
      selectedCards.splice(0, 1);
      selectedCards.push(this.p1.hand[options.index]);
    }

    function removeCard(){
      this.p1.hand[options.index].selected = '';
      selectedCards.splice(selectedCards.indexOf(options.index), 1);
    }

    function addNewCard(){
      selectedCards.push(_hand[options.index]);
      _hand[options.index].selected = 'selected';
    }

    function hasTwoCards(){
      return selectedCards.length > 1 && selectedCards.indexOf(options.index) === -1;
    }

    function isAlreadySelected(){
      return selectedCards.filter(function(element){
        return element.suit === _hand[options.index].suit && element.value === _hand[options.index].value;
      }).length > 0;
    }

    var selectedCards = this.p1.getSelectedCards();

    var _hand = this.p1.hand;

    if(isAlreadySelected.apply(this))
      removeCard.apply(this);
    else if(hasTwoCards())
      replaceOldCard.apply(this);
    else addNewCard.apply(this);

    if(selectedCards.length === 2){
      this.mediator.publish('messages-add', 'When you\'re ready, continue');
      this.game.$action = {text: 'Cont.'};
    }
    else if(selectedCards.length === 1)
      this.mediator.publish('messages-add', 'Pick one more card');
     else
      this.mediator.publish('messages-add', 'Pick two cards for ' + this.game.$cribOwner.possessive + ' crib');

    this.render();
  };

  CribState.prototype.action = function() {
    if(this.p1.getSelectedCards().length === 2){
      this.p1.placeCardsInCrib(this.game.$cribOwner);
      this.p1.handInMemory = this.p1.hand.slice();
      this.mediator.publish('transition', 'PrePlay');
    } else {
      this.mediator.publish('messages-add', 'Pick two cards for ' + this.game.$cribOwner.possessive + ' crib');
      this.render();
    }
  };

  return CribState;
});
