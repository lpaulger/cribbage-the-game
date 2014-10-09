define(['app'], function(App) {
  'use strict';
  describe('App', function() {
    var app;
    
    describe('init', function(){
      beforeEach(function(){
        app = new App();
        spyOn(app.mediator, 'publish');
        app.init();
      });

      it('should publish start', function(){
        expect(app.mediator.publish.calls.count()).toEqual(1);
        expect(app.mediator.publish).toHaveBeenCalledWith('start');
      });

      afterEach(function(){
        app.game = {
          $messages: []
        };
        app.states = [
          {name: 'Draw', init: jasmine.createSpy('init')},
          {name:'Play', init: jasmine.createSpy('init')}
        ];
      });
    });

    describe('transitionTo', function(){
      beforeEach(function(){
        jasmine.clock().install();
        app = new App();
        app.game = {
          $messages: []
        };
        app.states = [
          {name: 'Draw', init: jasmine.createSpy('init')},
          {name:'Play', init: jasmine.createSpy('init')}
        ];
      });

      afterEach(function() {
        jasmine.clock().uninstall();
      });

      describe('and wait is true', function(){
        it('should call render', function(){
          app.mediator.publish('transition', 'Play', true);
          expect(app.states[1].init).not.toHaveBeenCalled();
          jasmine.clock().tick(1001);
          expect(app.states[1].init).toHaveBeenCalled();
        });
      });

      describe('and wait is false', function(){
        it('should call render', function(){
          app.mediator.publish('transition', 'Play', false);
          expect(app.states[1].init).toHaveBeenCalled();
          jasmine.clock().tick(1001);
          expect(app.states[1].init).toHaveBeenCalled();
        });
      });

      describe('and state doesn\'t exist', function(){
        it('should throw error', function(){
          expect(function(){
            app.mediator.publish('transition', 'FAKE', false);
          }).toThrowError('State FAKE Not Found');
        });
      });
    });

    describe('startGame published', function(){
      beforeEach(function(){
        app = new App();
        app.game = {
          $messages: []
        };
        app.states = [
          {name: 'Draw', init: function(){}},
          {name:'Play', init: function(){}}
        ];

        spyOn(app.states[0], 'init');
        app.mediator.publish('start');
      });

      it('should create a new game', function(){
        expect(app.game).toBeDefined();
      });
    });

    describe('message', function(){
      beforeEach(function(){
        app = new App();
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
        app = new App();
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
