/*global define */
define(['modules/CardModule'], function (Card) {
  'use strict';

  function Deck(options){
    this.deckType = (options && options.deckType) ? options.deckType : '52-card';
    this.cards = createDeck(this.deckType);
  };

  Deck.prototype.shuffle = function(){
    for(var j, x, i = this.cards.length; i; j = Math.floor(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
  };

  Deck.prototype.cut = function(){
    return this.cards.pop();
  };

  Deck.prototype.deal = function(){
    this.topHand = [], this.bottomHand = [];
    this.shuffle();

    while(this.topHand.length < 6) {
      this.topHand.push(this.cards.pop());
      this.bottomHand.push(this.cards.pop());
    }

    return {
      topHand: this.topHand,
      bottomHand: this.bottomHand
    }
  };

  Deck.prototype.selectOne = function(index) {
    var selected = this.cards.splice(index, 1)[0];
    this.cards.push(selected);
    return selected;
  };

  function createDeck(deckType){
    switch (deckType){
      case '52-card':
        return create52();
        break;
      default:

      break;
    }
  };

  function create52 () {
  	var cards = [];

    cards = cards.concat(createSuit('hearts'));
    cards = cards.concat(createSuit('clubs'));
    cards = cards.concat(createSuit('diams'));
    cards = cards.concat(createSuit('spades'));

    return cards;
  };

  function createSuit (type) {
    var suit = [];
    for (var i = 1; i < 14; i++) {
      suit.push(new Card(i, type));
    };
    return suit;
  };

  return Deck;
});
