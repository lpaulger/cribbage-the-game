/* global describe, it */

define(['modules/DeckModule'], function(Deck) {
  'use strict';
  var _deck;

  describe('DeckModule', function(){
    describe('Constructor', function(){
      it('should set the deckType', function(){
        _deck = new Deck();
        expect(_deck.deckType).toEqual('52-card');
      });

      it('should set the cards based on deckType', function(){
        _deck = new Deck();
        expect(_deck.cards.length).toEqual(52);

      });
    });

    describe('selectOne', function(){
      var selected, currentTop;
      beforeEach(function(){
        _deck = new Deck();
        selected = _deck.cards[3];
        currentTop = _deck.cards[51];
      });

      it('should select the card at requested index', function(){
        expect(_deck.selectOne(3)).toEqual(selected);
      });

      it('should place selected card on top of deck', function(){
        expect(_deck.cards[51]).toEqual(currentTop);
        expect(_deck.selectOne(3)).toEqual(_deck.cards[51]);
      });
    });

    describe('deal', function(){
      beforeEach(function(){
        _deck = new Deck();
      });

      it('should return two hands', function(){
        var response = _deck.deal();
        expect(response.topHand.length).toEqual(6);
        expect(response.bottomHand.length).toEqual(6);
      });
    });

    describe('shuffle', function(){
      describe('and the deck has missing cards', function(){
        it('should recreate the deck with all 52 cards', function(){
          _deck = new Deck();
          _deck.deal();
          expect(_deck.cards.length).toEqual(40);
          _deck.shuffle();
          expect(_deck.cards.length).toEqual(52);
        });
      });
    });

    describe('cut', function(){
      beforeEach(function(){
        _deck = new Deck();
      });

      it('should return the top card', function(){
        var topCard = _deck.cards[_deck.cards.length-1];
        expect(_deck.cut()).toEqual(topCard);
      });
    });
  });
});
