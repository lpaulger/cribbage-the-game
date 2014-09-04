define(['gameStates/CountState'], function(CountState){
  'use strict';
  var _countState, _game, _player1, _player2;

  function createBasicGame() {
    _player1 = {};
    _player2 = {};
    _game = {
      $player1: _player1,
      $player2: _player2,
      $cribOwner: _player2
    };
  }''

  describe('CountState', function () {
    it('should create CountState', function () {
      createBasicGame();
      _countState = new CountState(_game);
    });

    describe('init', function () {
      beforeEach(function () {
        createBasicGame();
        _countState = new CountState(_game);
        _countState.init();
      });
      it('show non crib holders hand', function () {
        expect(_game.$player1HandVisible).toBe(true);
        expect(_game.$player2HandVisible).toBe(false);
      });
    });
  });
});