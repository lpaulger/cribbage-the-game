define(['modules/GameModule'], function(Game){
  'use strict';
  var _game;

  describe('Game', function () {
    beforeEach(function () {
      _game = new Game({});
    });

    afterEach(function(){
      _game = {};
    });

    describe('creating a new game', function () {
      it('should create a game', function () {
        expect(typeof _game).toBe('object');
      });

      it('should set two players', function () {
        expect(_game.$player1).toBeDefined();
        expect(_game.$player2).toBeDefined();
      });

      it('should create a deck', function () {
        expect(_game.$deck).toBeDefined();
      });
    });
  });
});
