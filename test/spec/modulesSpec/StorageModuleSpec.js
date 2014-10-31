define(['scripts/modules/StorageModule', 'scripts/modules/GameModule'], function(Storage, Game){
  'use strict';

  describe('Storage', function(){
    beforeEach(function(){
      spyOn(localStorage, 'getItem').and.callThrough();
      spyOn(localStorage, 'setItem').and.callThrough();
      spyOn(localStorage, 'clear').and.callThrough();
    });

    describe('Constructor', function(){
      it('should create Storage Module', function(){
        expect(typeof Storage).toBe('object');
      });
    });

    describe('save game', function(){
      var game;
      beforeEach(function(){
        game = new Game({});
      });

      it('should save the game data', function(){
        Storage.saveGame(game, 'Play');
      });
    });

    describe('load game', function(){
      var game;
      describe('and the data exists', function(){
        beforeEach(function(){
          game = new Game({});
          Storage.saveGame(game, 'Play');
        });

        it('should get the data', function(){
          var test = Storage.loadGame();
          expect(localStorage.getItem).toHaveBeenCalledWith('game');
          expect(localStorage.getItem).toHaveBeenCalledWith('state');
          expect(test).toBeDefined();
        });
      });
    });
  });
});
