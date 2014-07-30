/* global describe, it */

define(['gameStates/PrePlayState'], function(PrePlayState) {
    'use strict';

    describe("PrePlayState", function () {
      var _prePlayState, _game, _player, _cribOwner, _setup;
      beforeEach(function () {
        _setup = function(){
          _game = {
            $messages: ['default'],
            $player1: _player,
            $cribOwner: _cribOwner,
            $deck: {
              cards: []
            },
            transitionTo: function(state, animate){}
          };

          spyOn(_game, "transitionTo");
          _prePlayState = new PrePlayState(_game);
        }
      });

      describe("init", function () {
        describe("if Player is CribOwner", function () {
          beforeEach(function () {
            _player = _cribOwner = {hand:[], selectOneFromDeck: function(){}};
            _setup();
          });

          it("should set message to 'They will reveal top card'", function () {
            expect(_game.$messages).toEqual(['default']);
            _prePlayState.init();
            expect(_game.$messages).toEqual(['They will reveal top card']);
          });
        });

        describe("if Player is not CribOwner", function () {
          beforeEach(function () {
            _cribOwner = {name: 'Robo', selectOneFromDeck: function(){}};
            _player = {name: 'User'};
            _setup();
          });

          it("should set message to 'Reveal Top Card'", function () {
            expect(_game.$messages).toEqual(['default']);
            _prePlayState.init();
            expect(_game.$messages).toEqual(['Reveal Top Card']);
          });
        });
      });

      describe("deck", function () {
        beforeEach(function () {
          _setup();
          _prePlayState.deck();
        });
        
        it("should transitionTo 'Play' state", function () {
          expect(_game.transitionTo).toHaveBeenCalledWith('Play', false);
        });
      });
    });
});
