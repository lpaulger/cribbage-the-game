/* global describe, it */

define(['modules/DeckModule', 'modules/CardModule'], function(Deck, Card) {
  'use strict';
  var _deck, Card;
  
  describe("DeckModule", function(){
    beforeEach(function(){

    })

    describe("Constructor", function(){
      it("should set the deckType", function(){
        _deck = new Deck();
        expect(_deck.deckType).toEqual('52-card')
      })

      it("should set the cards based on deckType", function(){
        _deck = new Deck();
        expect(_deck.cards.length).toEqual(52)

      })
    })

    describe("selectOne", function(){
      var selected, currentTop;
      beforeEach(function(){
        _deck = new Deck();
        selected = _deck.cards[3];
        currentTop = _deck.cards[51];
      })

      it("should select the card at requested index", function(){
        expect(_deck.selectOne(3)).toEqual(selected);
      })

      it("should place selected card on top of deck", function(){
        expect(_deck.cards[51]).toEqual(currentTop);
        expect(_deck.selectOne(3)).toEqual(_deck.cards[51]);
      })
    });
  });
});