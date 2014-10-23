define(['modules/StorageModule'], function(Storage){
  'use strict';
  
  describe('Storage', function(){
    beforeEach(function(){
      spyOn(localStorage, 'getItem');
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'clear');
    });

    describe('Constructor', function(){
      it('should create Storage Module', function(){
        expect(typeof Storage).toBe('object');
      });
    });

    describe('save game', function(){
      var game;
      beforeEach(function(){
        game = {};
      });
      it('should save the game data', function(){
        Storage.saveGame(game, 'Play');
        expect(localStorage.setItem).toHaveBeenCalledWith('game', JSON.stringify(game));
        expect(localStorage.setItem).toHaveBeenCalledWith('state', 'Play');
      });
    });

    describe('get data', function(){
      describe('and the data exists', function(){
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