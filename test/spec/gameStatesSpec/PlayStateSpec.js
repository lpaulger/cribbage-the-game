define(['gameStates/PlayState'], function (PlayState) {
  'use strict';

  var _playState, _game, _player;

  function setupBasicGame() {
    _player = {
      playCard: function () {
      }
    };
    _game = {
      transitionTo: function () {
      },
      currentPlayer: _player,
      $player1: _player
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
        spyOn(_game, "transitionTo");
        spyOn(_player, "playCard");

        _playState = new PlayState(_game);
        _playState.selectCard({index: 1});
      });

      it('should play card', function () {
        expect(_player.playCard).toHaveBeenCalledWith(1);
      });

      it('should transition back to Play', function () {
        expect(_game.transitionTo).toHaveBeenCalledWith('Play', true);
      });
    });

    describe('when player selects invalid card', function () {
      beforeEach(function () {
        spyOn(_game, "transitionTo");
        spyOn(_player, "playCard").and.throwError('No Playable Cards');

        _playState = new PlayState(_game);
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
});