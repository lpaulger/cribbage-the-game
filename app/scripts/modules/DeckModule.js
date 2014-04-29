/*global define */
define(['modules/CardModule'], function (Card) {
    'use strict';
    function createSuit (type) {
      var suit = [];
      for (var i = 1; i < 14; i++) {
        suit.push(new Card(i, type));
      };
      return suit;
    };

    function create52 () {
    	var cards = [];

      cards = cards.concat(createSuit('hearts'));
      cards = cards.concat(createSuit('clubs'));
      cards = cards.concat(createSuit('diams'));
      cards = cards.concat(createSuit('spades'));

      return cards;
    };

    return function(options){
    	this.create = function(deckType){
    		this.deckType = deckType || '52-card';

    		switch (this.deckType){
    			case '52-card':
      			this.cards = create52();
    				break;
    			default:

    				break;
    		};
    	};

    	this.shuffle = function(){
    		for(var j, x, i = this.cards.length; i; j = Math.floor(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
    	};

      this.cut = function(){
        return this.cards.pop();
      };

      this.deal = function(){
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
    }
});