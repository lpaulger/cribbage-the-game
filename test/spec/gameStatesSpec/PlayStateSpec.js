define(['gameStates/PlayState'], function (PlayState) {
  'use strict';

  var _playState, _game, _player, _bot;

  function setupBasicGame() {
    _player = {
      name: 'test',
      hand: [],
      isWinner: function(){
        return false;
      },
      playCard: function () {
      },
      announceGo: function(){}
    };
    _bot = {
      hand: [],
      isWinner: function(){
        return false;
      },
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
        spyOn(_playState, 'unbindEvents').and.callThrough();
        _playState.selectCard({index: 1});
      });

      it('should play card', function () {
        expect(_player.playCard).toHaveBeenCalledWith(1);
      });

      it('should transition back to Play', function () {
        expect(_playState.mediator.publish).toHaveBeenCalledWith('transition', 'Play', true);
      });

      it('should prevent the user from making another action until the AI has gone', function(){
        expect(_playState.unbindEvents).toHaveBeenCalled();
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

    describe('When the player says go', function(){
      describe('and they have no playable cards', function(){
        beforeEach(function(){
          spyOn(_player, 'announceGo');
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
          _playState.action();
        });

        it('should not announce go for the player', function(){
          expect(_playState.p1.announceGo).toThrowError('Playable Cards');
        });

        it('should let the user know it has playable cards', function(){
          expect(_playState.mediator.publish).toHaveBeenCalledWith('messages-add', 'You can\'t go, you have playable cards.');
        });
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

      it('should clear the board', function(){
        _playState.action();
        expect(_playState.mediator.publish).toHaveBeenCalledWith('board-clear');
      });
    });
  });
});