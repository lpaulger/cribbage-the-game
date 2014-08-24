define(['modules/PlayLogic', 'modules/BoardModule'], function (PlayLogic, Board) {
    'use strict';
    var _board = Board.getInstance();
    function Player(name, possesive){
      this.name = name;
      this.possesive = possesive;
      this.hand = [];
      this.crib = [];
      this.cardsForCrib = [];
      this.score = 0;
      this.playLogic = PlayLogic.getInstance();
    }

    Player.prototype.placeCardsInCrib = function(cribOwner) {
      function removeFromHand(card){
        cribOwner.crib.push(this.hand.splice(this.hand.indexOf(card), 1));
      }
      if (this.cardsForCrib.length === 2) {
        this.cardsForCrib.forEach(removeFromHand.bind(this));
        this.cardsForCrib = [];
      };
    };

    Player.prototype.selectOneFromDeck = function(deck, cardIndex) {
      var card = deck.selectOne(cardIndex);
      this.playLogic.evaluateHisHeels(this, card);
      return card;
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

    Player.prototype.announceGo = function(){
      //checkPlayableCards
      //if hasPlayableCards == false playLogic.proceedWithGo
      if(!this.hasPlayableCards()){
        _board.announceGo(this);
        return this.name + ' announces GO!';
      } else {
        return this.name + ' can go, you have playable cards.';
      }
    }

    return Player;
});
