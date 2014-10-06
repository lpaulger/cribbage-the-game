/* global describe, it */

define(['gameStates/PrePlayState'], function(PrePlayState) {
    'use strict';

    describe('PrePlayState', function () {
      var _prePlayState, _game, _player, _cribOwner, _setup;
      beforeEach(function () {
        _setup = function(){
          _game = {
            $messages: ['default'],
            $player1: _player,
            $cribOwner: _cribOwner,
            $deck: {
              cards: []
            }
          };
          _prePlayState = new PrePlayState(_game);
          spyOn(_prePlayState.mediator, 'publish');
        };
      });

      afterEach(function(){
        _game = {};
      });

      describe('init', function () {
        describe('if Player is CribOwner', function () {
          beforeEach(function () {
            _player = _cribOwner = {hand:[], selectOneFromDeck: function(){}};
            _setup();
          });

          it('should set message to "Reveal top card"', function () {
            expect(_game.$messages).toEqual(['default']);
            _prePlayState.init();
            expect(_game.$messages).toEqual(['Reveal top card']);
          });
        });

        describe('if Player is not CribOwner', function () {
          beforeEach(function () {
            _cribOwner = {name: 'Robo', selectOneFromDeck: function(){}};
            spyOn(_cribOwner, 'selectOneFromDeck').and.returnValue({card: {}, isTwoForHisHeels: undefined});
            _player = {name: 'User'};
            _setup();
          });

          it('should set message to "They will reveal top card"', function () {
            expect(_game.$messages).toEqual(['default']);
            _prePlayState.init();
            expect(_game.$messages).toEqual(['They will reveal top card']);
          });
        });
      });

      describe('deck', function () {
        describe('and is not two for his heels', function(){
          beforeEach(function () {
            _player = _cribOwner = {name: 'test', hand:[], selectOneFromDeck: function(){}, points: 0};
            spyOn(_cribOwner, 'selectOneFromDeck').and.returnValue({card: {}, isTwoForHisHeels: 0});
            _setup();
            _prePlayState.deck();
          });

          it('should transitionTo "Play" state', function () {
            expect(_prePlayState.mediator.publish).toHaveBeenCalledWith('transition', 'Play', false);
          });
        });
        
        describe('and two for his heels', function(){
          beforeEach(function () {
            _player = _cribOwner = {name: 'test', hand:[], selectOneFromDeck: function(){}, points: 0};
            spyOn(_cribOwner, 'selectOneFromDeck').and.returnValue({card: {}, isTwoForHisHeels: 2});
            _setup();
            _prePlayState.deck();
          });

          it('should award crib owner 2 points', function(){
            expect(_game.$cribOwner.points).toEqual(2);
          });

          it('should display message', function(){
            expect(_game.$messages[0]).toEqual('test scored two for his heels');
          });
        });
      });
    });
  });
