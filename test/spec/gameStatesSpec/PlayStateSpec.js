/*globals xdescribe, xit */
define(['gameStates/PlayState', 'modules/PlayerModule'], function (PlayState, Player) {
  'use strict';

  var _playState, _game, _player, _bot;

  function setupBasicGame() {
    var board = {};
    _player = new Player({name: 'test', possessive: 'his', hand: [{value: 3}], board: board});
    _bot = new Player({name: 'test', possessive: 'his', hand: [{value: 2}], board: board});

    _game = {
      transitionTo: function () {
      },
      currentPlayer: _player,
      $player1: _player,
      $player2: _bot
    };
  }

  describe('PlayState', function () {
    beforeEach(function(){
      setupBasicGame();
    });

    afterEach(function(){
      _game = undefined;
    });

    it('should create PlayState', function () {
      _playState = new PlayState(_game);
      expect(typeof _playState).toBe('object');
    });

    //turning off while action only handles auto-select off
    xdescribe('Manual counting disabled', function(){
      describe('When player selects a valid card', function () {
        function setup(){
          spyOn(_player, 'playCard');
          _playState = new PlayState(_game);
          spyOn(_playState.mediator, 'publish');
          spyOn(_playState, 'unbindEvents').and.callThrough();
          _playState.selectCard({index: 1});
        }

        describe('and is end of the round', function(){
          beforeEach(function () {
            setup();
          });

          it('should play card', function () {
            expect(_player.playCard).toHaveBeenCalledWith(1);
          });

          it('should transition back to Play without waiting', function () {
            expect(_playState.mediator.publish).toHaveBeenCalledWith('transition', 'Play', false);
          });
        });

        describe('and not the end of the round', function(){
          beforeEach(function(){
            _player.hand = [{value: 10}];
            setup();
          });

          it('should transition back to Play and wait', function () {
            expect(_playState.mediator.publish).toHaveBeenCalledWith('transition', 'Play', true);
          });

          it('should prevent the user from making another action until the AI has gone', function(){
            expect(_playState.unbindEvents).toHaveBeenCalled();
          });
        });
      });

      describe('when player selects invalid card', function () {
        beforeEach(function () {
          spyOn(_player, 'playCard').and.throwError('No Playable Cards');
          _playState = new PlayState(_game);
          spyOn(_playState.mediator, 'publish');
          _playState.selectCard({index: 1});
        });

        it('should play card', function () {
          expect(_player.playCard).toHaveBeenCalledWith(1);
        });

        it('should throw error', function () {
          expect(_player.playCard).toThrowError('No Playable Cards');
        });
      });
    });


    describe('When the player clicks action', function(){
      describe('and they have no playable cards', function(){
        beforeEach(function(){
          spyOn(_player, 'announceGo');
          spyOn(_player, 'getSelectedCards').and.returnValue([]);
          _playState = new PlayState(_game);
          spyOn(_playState.mediator, 'publish');
          spyOn(_playState, 'unbindEvents');
          _playState.nextState = 'Play';
          _playState.action();
        });

        it('should announce go for the player', function(){
          expect(_playState.p1.announceGo).toHaveBeenCalled();
        });

        it('should prevent the user from taking action', function(){
          expect(_playState.unbindEvents).toHaveBeenCalled();
        });
      });

      describe('and they have playable cards', function(){
        beforeEach(function(){
          spyOn(_player, 'announceGo').and.throwError('Playable Cards');
          _playState = new PlayState(_game);
          spyOn(_playState.mediator, 'publish');
          spyOn(_playState, 'unbindEvents');
          _playState.nextState = 'Play';
        });

        it('should not announce go for the player', function(){
          expect(function(){
            _playState.action();
          }).toThrowError('Playable Cards');
        });

        //turning off while action only handles auto-select off
        xit('should let the user know it has playable cards', function(){
          expect(_playState.mediator.publish).toHaveBeenCalledWith('messages-add', 'You can\'t go, you have playable cards.');
        });
      });
    });

    describe('is end of round', function () {
      beforeEach(function () {
        _playState = new PlayState(_game);
        _playState.init();
        spyOn(_playState.mediator, 'publish');
        _playState.nextState = 'Count';
      });

      it('should transition to Count state', function () {
        expect(_playState.nextState).toBe('Count');
        _playState.action();
        expect(_playState.mediator.publish).toHaveBeenCalledWith('transition', 'Count', false);
        expect(_playState.nextState).toBe('Play');
      });

      it('should clear the board', function(){
        _playState.action();
        expect(_playState.mediator.publish).toHaveBeenCalledWith('board-clear');
      });
    });
  });
});
