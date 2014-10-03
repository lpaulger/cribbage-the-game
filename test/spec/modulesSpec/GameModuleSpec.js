define(['modules/GameModule'], function(Game){
  'use strict';
  var _game;

  describe('Game', function () {
    beforeEach(function () {
      _game = new Game();
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

      it('should proceed to the draw state', function () {
        expect(_game.$state.name).toBe('Draw');
      });
    });
    
    describe('start', function(){
      beforeEach(function(){
        spyOn(_game.$state, 'init');
        spyOn(_game.$state, 'render');
      });
      it('should call init', function(){
        _game.start();
        expect(_game.$state.init).toHaveBeenCalled();
        expect(_game.$state.render).toHaveBeenCalled();
      });
    });
    
    describe('transitionTo', function(){
      beforeEach(function(){
        jasmine.clock().install();
        spyOn(_game.$states, 'filter').and.callThrough();
        spyOn(_game.$state, 'render');
      });

      afterEach(function() {
        jasmine.clock().uninstall();
      });
      
      describe('and wait is true', function(){
        it('should call render', function(){
          expect(_game.$state.name).toEqual('Draw');
          _game.transitionTo('Play', true);
          expect(_game.$state.name).toEqual('Draw');
          jasmine.clock().tick(1001);
          expect(_game.$state.name).toEqual('Play');
        });
      });

      describe('and wait is false', function(){
        it('should call render', function(){
          expect(_game.$state.name).toEqual('Draw');
          _game.transitionTo('Play', false);
          expect(_game.$state.name).toEqual('Play');
          jasmine.clock().tick(1001);
          expect(_game.$state.name).toEqual('Play');
        });
      });
    });
  });
});
