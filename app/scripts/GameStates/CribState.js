define(['GameStates/BaseState', 'modules/DeckModule'],function(BaseState, Deck){
  function CribState(game){
    BaseState.call(this, game, 'Crib');
  }

  CribState.prototype = Object.create(BaseState.prototype);
  CribState.prototype.constructor = CribState;

  CribState.prototype.init = function(){

  };

  CribState.prototype.deck = function() {

  };

  CribState.prototype.selectCard = function(options) {
    var selectedCards = this.game.$player1.cardsForCrib;
    var _hand = this.game.$player1.hand;

    function replaceOldCard(){
      _hand[_hand.indexOf(selectedCards[0])].selected = '';
      _hand[options.index].selected = 'selected';
      selectedCards.splice(0, 1);
      selectedCards.push(this.game.$player1.hand[options.index]);
    }

    function removeCard(){
      this.game.$player1.hand[options.index].selected = '';
      selectedCards.splice(selectedCards.indexOf(options.index), 1);
    }

    function addNewCard(){
      selectedCards.push(_hand[options.index]);
      _hand[options.index].selected = 'selected';
    }

    function hasTwoCards(){
      return selectedCards.length > 1 && selectedCards.indexOf(options.index) == -1;
    }

    function isAlreadySelected(){
      return selectedCards.indexOf(_hand[options.index]) !== -1;
    }
    if(isAlreadySelected.apply(this))
      removeCard.apply(this);
    else if(hasTwoCards())
      replaceOldCard.apply(this);
    else addNewCard.apply(this);
  };

  CribState.prototype.action = function() {
    this.game.$player1.placeCardsInCrib(this.game.$cribOwner);
    this.game.$player2.placeCardsInCrib(this.game.$cribOwner);

    return this.game.transitionTo('PrePlay');
  };

  return CribState;
});
