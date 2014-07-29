/* global describe, it */

define(['modules/PlayerModule'], function(Player) {
    'use strict';

    describe("PlayerModule", function() {
      var _deck, card, _player, _cribOwner, _hands;
      beforeEach(function(){
        card = {
          value: 'val',
          suit: 'suit',
          name: 'name'
        };
        _deck = jasmine.createSpyObj('Deck', ['shuffle', 'cut', 'deal', 'selectOne']);
        _deck.deal.and.returnValue({
          topHand: [card, card, card, card, card, card],
          bottomHand: [card, card, card, card, card, card]
        });
        _player = new Player('test', 'tests');
      })

      describe("Constructor", function(){
        it("set the name", function() {
          expect(_player.name).toBe('test');
        });

        it("set the possesive", function() {
          expect(_player.possesive).toBe('tests');
        });
      });

      describe("placeCardsInCrib", function(){
        _player, _cribOwner, _hands;
        beforeEach(function(){
          _cribOwner = new Player('cOwner', 'cOwner\'s');
          _hands = _deck.deal();
          _player.hand = _hands.bottomHand;
        });

        describe("if 0 cards selected", function(){
          it("should not put cards in crib owners crib", function() {
            expect(_player.cardsForCrib.length).toBe(0);
            expect(_cribOwner.crib.length).toBe(0);

            _player.placeCardsInCrib(_cribOwner);

            expect(_player.cardsForCrib.length).toBe(0);
            expect(_cribOwner.crib.length).toBe(0);
          });
        });

        describe("if 1 card selected", function(){

          beforeEach(function(){
            _player.cardsForCrib.push(_player.hand[0]);
          });

          it("should not put cards in crib owners crib", function() {

            _player.placeCardsInCrib(_cribOwner);

            expect(_player.cardsForCrib.length).toBe(1);
            expect(_cribOwner.crib.length).toBe(0);
          });
        });

        describe("if 2 cards selected", function(){

          beforeEach(function(){
            _player.cardsForCrib.push(_player.hand[0]);
            _player.cardsForCrib.push(_player.hand[1]);
          });

          it("should put cards in crib owners crib", function() {
            expect(_player.cardsForCrib.length).toBe(2);
            expect(_cribOwner.crib.length).toBe(0);

            _player.placeCardsInCrib(_cribOwner);

            expect(_player.cardsForCrib.length).toBe(0);
            expect(_cribOwner.crib.length).toBe(2);
          });
        });
      });

      describe("selectOneFromDeck", function(){
        beforeEach(function(){
          _deck.selectOne.and.returnValue(card);
        });

        it("should return the card for selected index", function(){
          expect(_player.selectOneFromDeck(_deck, 2)).toEqual(card);
        });
      });
    });
});
