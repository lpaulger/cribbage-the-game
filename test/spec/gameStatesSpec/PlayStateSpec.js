define(['gameStates/PlayState'], function (PlayState) {
  'use strict';

  var _playState, _game, _player, _bot;

  function setupBasicGame() {
    _player = {
      hand: [],
      playCard: function () {
      }
    };
    _bot = {
      hand: [],
      playCard: function () {
      }
    };
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

    describe('When player selects a valid card', function () {
      beforeEach(function () {
        spyOn(_player, 'playCard');
        _playState = new PlayState(_game);
        spyOn(_playState.mediator, 'publish');
        _playState.selectCard({index: 1});
      });

      it('should play card', function () {
        expect(_player.playCard).toHaveBeenCalledWith(1);
      });

      it('should transition back to Play', function () {
        expect(_playState.mediator.publish).toHaveBeenCalledWith('transition', 'Play', true);
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

    describe('is end of round', function () {
      beforeEach(function () {
        _playState = new PlayState(_game);
        spyOn(_playState.mediator, 'publish');
        _playState.init();
      });

      it('should transition to Count state', function () {
        expect(_playState.nextState).toBe('Count');
        _playState.action();
        expect(_playState.mediator.publish).toHaveBeenCalledWith('transition', 'Count', true);
        expect(_playState.nextState).toBe('Play');
      });
    });
  });
});