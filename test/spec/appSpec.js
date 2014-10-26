define(['app'], function(App) {
  'use strict';

  xdescribe('App', function() {
    var app = new App();
    beforeEach(function(){
      spyOn(app.stateRegistry, 'initState').and.returnValue({
        init: jasmine.createSpy('init'),
        name: 'Play'
      });
    });

    describe('constructor', function(){
      it('should create App', function(){
        expect(typeof app).toBe('object');
      });

      it('should have access to storage', function(){
        expect(app.storage).toBeDefined();
      });
    });

    describe('init', function(){
      beforeEach(function(){
        spyOn(app.mediator, 'publish');
        app.init();
      });

      it('should publish transition Home', function(){
        expect(app.mediator.publish.calls.count()).toEqual(1);
        expect(app.mediator.publish).toHaveBeenCalledWith('transition', 'Home');
      });
    });



    describe('transitionTo', function(){
      beforeEach(function(){
        jasmine.clock().install();
        spyOn(app.storage, 'saveGame');
      });

      afterEach(function() {
        jasmine.clock().uninstall();
      });

      it('should save the game', function(){
        app.mediator.publish('transition', 'Play', false);
        expect(app.storage.saveGame).toHaveBeenCalledWith( app.game, 'Play');
      });

      describe('and wait is true', function(){
        it('should call render', function(){
          app.mediator.publish('transition', 'Play', true);
          jasmine.clock().tick(1001);
          expect(app.stateRegistry.initState).toHaveBeenCalledWith('Play', app.game);
        });
      });

      describe('and wait is false', function(){
        it('should call render', function(){
          app.mediator.publish('transition', 'Play', false);
          expect(app.stateRegistry.initState).toHaveBeenCalledWith('Play', app.game);
          jasmine.clock().tick(1001);
          expect(app.stateRegistry.initState.calls.count()).toEqual(1);
        });
      });
    });

    describe('startGame published', function(){

      beforeEach(function(){
        app.mediator.publish('start');
      });

      it('should create a new game', function(){
        expect(app.game).toBeDefined();
      });
    });

    describe('continueGame published', function(){
      beforeEach(function(){
        spyOn(app.storage, 'loadGame').and.returnValue({
          game: {},
          state: 'Play'
        });
      });

      it('should load the saved game', function(){
        app.mediator.publish('continue');
        expect(app.storage.loadGame).toHaveBeenCalled();
      });
    });

    describe('message', function(){
      beforeEach(function(){
        app.game = {
          $messages: []
        };
      });
      describe('and add one message', function(){
        it('should add the message to the game\'s messages', function(){
          app.mediator.publish('messages-add', 'test message');
          expect(app.game.$messages.length).toEqual(1);
          expect(app.game.$messages[0]).toEqual('test message');
        });
      });

      describe('and has one message, then clear messages', function(){
        it('should have a 1 message, then none', function(){
          app.mediator.publish('messages-add', 'test message');
          app.mediator.publish('messages-clear');
          expect(app.game.$messages.length).toEqual(0);
        });
      });

      describe('push 3 messages and then clear', function(){
        it('should have a length of 3, and then 0', function(){
          app.mediator.publish('messages-add', 'test message');
          app.mediator.publish('messages-add', 'test message');
          app.mediator.publish('messages-add', 'test message');
          expect(app.game.$messages.length).toEqual(3);
          app.mediator.publish('messages-clear');
          expect(app.game.$messages.length).toEqual(0);
        });
      });
    });

    describe('winner', function(){
      var player;
      beforeEach(function(){
        player = {name: 'test'};
        app.game = {
          winner: {}
        };
      });

      it('should set the game.winner to the player', function(){
        expect(app.game.winner).not.toEqual(player);
        app.mediator.publish('winner', player);
        expect(app.game.winner).toEqual(player);
      });
    });
  });
});
