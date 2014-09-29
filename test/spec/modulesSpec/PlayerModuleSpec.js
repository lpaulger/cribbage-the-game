define(['modules/PlayerModule'], function(Player) {
    'use strict';

    describe('PlayerModule', function() {
      var _deck, card, _player, _cribOwner, _hands;
      beforeEach(function(){
        card = {
          faceValue: 10,
          value: 10,
          suit: 'hearts',
          name: '10'
        };
        _deck = jasmine.createSpyObj('Deck', ['shuffle', 'cut', 'deal', 'selectOne']);
        _deck.deal.and.returnValue({
          topHand: [card, card, card, card, card, card],
          bottomHand: [card, card, card, card, card, card]
        });
        _player = new Player('test', 'tests');
        spyOn(_player.scoreKeeper, 'TwoForHisHeels');
      });

      describe('Constructor', function(){
        it('set the name', function() {
          expect(_player.name).toBe('test');
        });

        it('set the possesive', function() {
          expect(_player.possesive).toBe('tests');
        });
      });

      describe('placeCardsInCrib', function(){
        beforeEach(function(){
          _cribOwner = new Player('cOwner', 'cOwner\'s');
          _hands = _deck.deal();

          _player.hand = _hands.bottomHand;
        });

        describe('if 0 cards selected', function(){
          it('should not put cards in crib owners crib', function() {
            expect(_player.cardsForCrib.length).toBe(0);
            expect(_cribOwner.crib.length).toBe(0);

            _player.placeCardsInCrib(_cribOwner);

            expect(_player.cardsForCrib.length).toBe(0);
            expect(_cribOwner.crib.length).toBe(0);
          });
        });

        describe('if 1 card selected', function(){

          beforeEach(function(){
            _player.cardsForCrib.push(_player.hand[0]);
          });

          it('should not put cards in crib owners crib', function() {

            _player.placeCardsInCrib(_cribOwner);

            expect(_player.cardsForCrib.length).toBe(1);
            expect(_cribOwner.crib.length).toBe(0);
          });
        });

        describe('if 2 cards selected', function(){

          beforeEach(function(){
            _player.cardsForCrib.push(_player.hand[0]);
            _player.cardsForCrib.push(_player.hand[1]);
          });

          it('should put cards in crib owners crib', function() {
            expect(_player.cardsForCrib.length).toBe(2);
            expect(_cribOwner.crib.length).toBe(0);

            _player.placeCardsInCrib(_cribOwner);

            expect(_player.cardsForCrib.length).toBe(0);
            expect(_cribOwner.crib.length).toBe(2);
            expect(_cribOwner.crib[0]).toBe(card);
          });

          it('should unselect the two cards', function () {
            _player.placeCardsInCrib(_cribOwner);
            expect(_cribOwner.crib[0].selected).toEqual('');
            expect(_cribOwner.crib[1].selected).toEqual('');
          });
        });
      });

      describe('selectOneFromDeck', function(){
        beforeEach(function(){
          _deck.selectOne.and.returnValue(card);
        });

        it('should return the card for selected index', function(){
          expect(_player.selectOneFromDeck(_deck, 2)).toEqual(card);
        });

        it('should check if TwoForHisHeels', function(){
          var card = _player.selectOneFromDeck(_deck, 2);
          expect(_player.scoreKeeper.TwoForHisHeels).toHaveBeenCalledWith(card, _player);
        });
      });
    });
  });