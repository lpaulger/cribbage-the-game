define(['modules/PlayLogic', 'modules/BoardModule'], function (PlayLogic, Board) {
    'use strict';
    var _board = Board.getInstance();
    function Player(name, possessive){
      this.name = name;
      this.possesive = possessive;
      this.hand = [];
      this.handInMemory = [];
      this.crib = [];
      this.cardsForCrib = [];
      this.playLogic = PlayLogic.getInstance();
    }

    Player.prototype.placeCardsInCrib = function(cribOwner) {
      function removeFromHand(card){
        cribOwner.crib.push(this.hand.splice(this.hand.indexOf(card), 1));
      }
      if (this.cardsForCrib.length === 2) {
        this.cardsForCrib.forEach(removeFromHand.bind(this));
        this.cardsForCrib = [];
      }
    };

    Player.prototype.selectOneFromDeck = function(deck, cardIndex) {
      return deck.selectOne(cardIndex);
    };

    Player.prototype.playCard = function(index) {
      var _tempHand = this.hand.slice();
      var card = _tempHand.splice(index, 1)[0];//selectCardFromHand
      if(this.playLogic.isCardPlayable(this, card)){
        _board.placeCard(card, this);
        this.hand.splice(index, 1)[0];
      } else if(!this.hasPlayableCards()){
        gm.$messages = ['No Playable Cards, Press \'Go!\''];
        throw new Error('No Playable Cards')
      } else {
        gm.$messages = ['Try another card'];
        throw new Error('Invalid Playable Card')
      }
    };

    Player.prototype.hasPlayableCards = function () {
      return this.playLogic.hasPlayableCards(this);
    };

    Player.prototype.announceGo = function(purpose){
      if(purpose == 'Count')
        _board.resetBoard();
      else if(!this.hasPlayableCards()){
        _board.announceGo(this);
        gm.$messages = [this.name + ' announces GO!'];
      } else {
        gm.$messages = [this.name + ' can\'t go, you have playable cards.'];
        throw new Error('Playable Cards');
      }
    };

    Player.prototype.restoreHand = function(){
      this.hand = this.handInMemory;
    };

    return Player;
});
