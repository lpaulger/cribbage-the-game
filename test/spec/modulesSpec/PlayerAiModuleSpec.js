/* global describe, it */

define(['modules/PlayerAiModule'], function(PlayerAi) {
  'use strict';
  var _playerAi, _deck, card, _hands, _cribOwner;
  describe('PlayerAiModule', function() {
    beforeEach(function(){
      _playerAi = new PlayerAi('name', 'name\'s');
      card = {
        value: 'val',
        suit: 'suit',
        name: 'name'
      };
      _deck = jasmine.createSpyObj('Deck', ['shuffle', 'cut', 'deal', 'selectOne']);
      _deck.cards = new Array(39);
      _deck.deal.and.returnValue({
        topHand: [card, card, card, card, card, card],
        bottomHand: [card, card, card, card, card, card]
      });
    });

    describe('placeCardsInCrib', function(){
      beforeEach(function(){
        _cribOwner = new PlayerAi('cOwner', 'cOwner\'s');
        _hands = _deck.deal();
        _playerAi.hand = _hands.bottomHand;
      });

      it('should select two random cards for the cribOwner', function(){
        expect(_cribOwner.crib.length).toEqual(0);
        _playerAi.placeCardsInCrib(_cribOwner);
        expect(_cribOwner.crib.length).toEqual(2);
        expect(_cribOwner.crib[0]).toBe(card);
      });
    });
  });
});
