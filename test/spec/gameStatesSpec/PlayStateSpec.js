define(['gameStates/PlayState'], function (PlayState) {
  'use strict';

  var _playState, _game;

  describe('PlayState', function () {

    it('should create PlayState', function () {
      _playState = new PlayState();
      expect(typeof _playState).toBe('object');
    });

    describe('when first initializing the PlayState', function () {
      it('should have 0 cards on the board', function () {
        expect(_board.currentBoardValue).toBe(0);
      });
    });
  });
});