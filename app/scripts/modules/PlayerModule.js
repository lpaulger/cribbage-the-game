define(['modules/ScoresSingleton'], function (Scores) {
    'use strict';
    function Player(name, possesive){
      this.name = name;
      this.possesive = possesive;
      this.hand = [];
      this.play = [];
      this.crib = [];
      this.cardsForCrib = [];
      this.score = 0;
      this.scores = Scores.getInstance();
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
      return deck.selectOne(cardIndex);
    };

    Player.prototype.playCard = function(index) {
      var card = this.hand.splice(index, 1)[0];
      this.scores.evaluateCard(this, card);
      return this.play.push(card);
    };

    Player.prototype.evaluatePlayableCards = function () {
      return this.scores.evaluatePlayableCards(this);
    };

    Player.prototype.announceGo = function(){
      console.log(this.name + ' announces GO!');
    }

    return Player;
});
