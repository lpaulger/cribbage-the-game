define(['gameStates/BaseState'],function(BaseState){
  function CribState(game){
    BaseState.call(this, game, 'Crib');
    gm = this.game;
    p1 = this.game.$player1;
    p2 = this.game.$player2;
  }

  CribState.prototype = Object.create(BaseState.prototype);
  CribState.prototype.constructor = CribState;

  CribState.prototype.selectCard = function(options) {
    var selectedCards = this.game.$player1.cardsForCrib;
    var _hand = this.game.$player1.hand;

    if(isAlreadySelected.apply(this))
      removeCard.apply(this);
    else if(hasTwoCards())
      replaceOldCard.apply(this);
    else addNewCard.apply(this);

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
  };

  CribState.prototype.action = function() {
    if(gm.$player1.cardsForCrib.length === 2){
      p1.placeCardsInCrib(gm.$cribOwner);
      p2.placeCardsInCrib(gm.$cribOwner);
      p1.handInMemory = p1.hand.slice();
      p2.handInMemory = p2.hand.slice();
      this.game.transitionTo('PrePlay');
    } else {
      gm.$messages = ['Please select two cards for ' + gm.$cribOwner.possesive + ' crib.'];
    }
  };

  return CribState;
});
