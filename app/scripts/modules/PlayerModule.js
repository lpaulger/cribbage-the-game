define([], function () {
    'use strict';
    function Player(name, possesive){
      this.name = name;
      this.possesive = possesive;
      this.hand = [];
      this.crib = [];
      this.cardsForCrib = [];
    }

    Player.prototype.placeCardsInCrib = function(cribOwner) {
      function removeFromHand(card){
        console.log(this.hand[this.hand.indexOf(card)]);
        cribOwner.crib.push(this.hand.splice(this.hand.indexOf(card), 1));
      }
      if(this.cardsForCrib.length === 2){
        this.cardsForCrib.forEach(removeFromHand.bind(this));
        this.cardsForCrib = [];
      } else {
        this.$messages = ['Please select two cards for ' + cribOwner.possesive + ' crib.'];
      }
    };

    return Player;
});