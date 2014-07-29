define(['modules/ScoresSingleton'], function (Scores) {
    'use strict';
    function Player(name, possesive){
      this.name = name;
      this.possesive = possesive;
      this.hand = [];
      this.play = [];
      this.crib = [];
      this.cardsForCrib = [];
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
      console.log(this.hand[index]);
      return this.play.push(this.hand.splice(index, 1)[0])
    };

    Player.prototype.announceGo = function(){
      console.log('GO');
    }

    return Player;
});
