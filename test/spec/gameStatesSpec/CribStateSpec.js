define(['gameStates/CribState'], function(CribState) {
  'use strict';
  var _cribState,
      _game,
      gameSetup = function(){
        _game = {
          $player1:{
            hand:[
              {value:1},
              {value:2},
              {value:3},
              {value:4},
              {value:5},
              {value:6}
            ],
            cardsForCrib:[],
            possessive:'his',
            placeCardsInCrib: function(){}
          },
          $player2: {
            hand:[
              {value:1},
              {value:2},
              {value:3},
              {value:4},
              {value:5},
              {value:6}
            ],
            cardsForCrib:[],
            possessive:'his',
            placeCardsInCrib: function(){}
          },
          $cribOwner: {possessive:'his'},
          transitionTo: function(){}
        };
      };
  describe('CribState', function () {
    beforeEach(function(){
      gameSetup();
    });
    describe('Create CribState', function(){
      it('should create a cribState', function(){
        _cribState = new CribState(_game);
        expect(_cribState).toBeDefined();
      });
    });

    describe('SelectOne', function(){
      beforeEach(function(){
        gameSetup();
        _cribState = new CribState(_game);
      });

      afterEach(function(){
        gameSetup();
      });

      describe('if no cards selected', function(){
        it('should add to selectedCards', function(){
          _cribState.selectCard({index: 1});
          expect(_game.$player1.cardsForCrib.length).toBe(1);
        });
      });

      describe('if two cards are selected', function(){
        beforeEach(function(){
          _cribState.selectCard({index:1});
          _cribState.selectCard({index:2});
        });
        
        it('should replace the first card', function(){
          expect(_game.$player1.cardsForCrib.length).toBe(2);
          _cribState.selectCard({index: 3});
          expect(_game.$player1.cardsForCrib.length).toBe(2);
          expect(_game.$player1.cardsForCrib[0]).toEqual({value:3, selected: 'selected'});
          expect(_game.$player1.cardsForCrib[1]).toEqual({value:4, selected: 'selected'});
        });
      });

      describe('if selectedCard is removed', function(){
        it('should remove the card', function(){
          _cribState.selectCard({index:1});
          expect(_game.$player1.cardsForCrib.length).toBe(1);
          _cribState.selectCard({index:1});
          expect(_game.$player1.cardsForCrib.length).toBe(0);
        });
      });
    });

    describe('Action', function(){
      beforeEach(function(){
        spyOn(_game.$player1, 'placeCardsInCrib');
        spyOn(_game.$player2, 'placeCardsInCrib');
        spyOn(_game, 'transitionTo');
        _cribState = new CribState(_game);
      });
      describe('if two cards are selected', function(){
        beforeEach(function(){
          _cribState.selectCard({index:1});
          _cribState.selectCard({index:2});
        });
        it('should place two cards in crib', function(){
          _cribState.action();
          expect(_game.$player1.placeCardsInCrib.calls.count()).toBe(1);
          expect(_game.$player2.placeCardsInCrib.calls.count()).toBe(1);
        });

        it('should transition to PrePlay', function(){
          _cribState.action();
          expect(_game.transitionTo.calls.count()).toBe(1);
          expect(_game.transitionTo).toHaveBeenCalledWith('PrePlay');
        });
      });
      describe('if no cards are selected', function(){
        it('should place two cards in crib', function(){
          _cribState.action();
          expect(_game.$player1.placeCardsInCrib.calls.count()).toBe(0);
          expect(_game.$player2.placeCardsInCrib.calls.count()).toBe(0);
        });

        it('should transition to PrePlay', function(){
          _cribState.action();
          expect(_game.transitionTo.calls.count()).toBe(0);
        });
      });
    });
  });
});