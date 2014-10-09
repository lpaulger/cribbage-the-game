define(['app', 'modules/Mediator'], function(App, Mediator) {
  'use strict';
  describe('App', function() {
    var app, Game, _mediator, StateRegistry;
    beforeEach(function(){
      Game = function(){
        this.$messages = [];
      };
      _mediator = {
        subscribe: jasmine.createSpy('subscribe'),
        publish: jasmine.createSpy('publish')
      };
      StateRegistry = function(){
        return [{init: jasmine.createSpy('init')}];
      };
    });

    describe('init', function(){
      beforeEach(function(){
        app = new App(Game, _mediator, StateRegistry);
        app.init();
      });

      it('should create a game', function(){
        expect(app.game).toBeDefined();
      });

      it('should call mediator subscribe to events', function(){
        expect(_mediator.subscribe.calls.count()).toEqual(5);
      });

      it('should publish start', function(){
        expect(_mediator.publish.calls.count()).toEqual(1);
        expect(_mediator.publish).toHaveBeenCalledWith('start');
      });
    });

    describe('transitionTo', function(){
      beforeEach(function(){
        jasmine.clock().install();

        StateRegistry = function(){
          return [{init: jasmine.createSpy('init'), name: 'Draw'}, {init: jasmine.createSpy('init'), name: 'Play'}];
        };
        app = new App(Game, Mediator, StateRegistry);
      });

      afterEach(function() {
        jasmine.clock().uninstall();
      });

      describe('and wait is true', function(){
        it('should call render', function(){
          Mediator.publish('transition', 'Play', true);
          expect(app.states[1].init).not.toHaveBeenCalled();
          jasmine.clock().tick(1001);
          expect(app.states[1].init).toHaveBeenCalled();
        });
      });

      describe('and wait is false', function(){
        it('should call render', function(){
          Mediator.publish('transition', 'Play', false);
          expect(app.states[1].init).toHaveBeenCalled();
          jasmine.clock().tick(1001);
          expect(app.states[1].init).toHaveBeenCalled();
        });
      });

      describe('and state doesn\'t exist', function(){
        it('should throw error', function(){
          expect(function(){
            Mediator.publish('transition', 'FAKE', false);
          }).toThrowError('State FAKE Not Found');
        });
      });
    });

    describe('startGame published', function(){
      beforeEach(function(){
        StateRegistry = function(){
          return [{init: jasmine.createSpy('init')}];
        };
        app = new App(Game, Mediator, StateRegistry);
        app.init();
      });

      it('should call init on the first state', function(){
        expect(app.states[0].init).toHaveBeenCalled();
      });
    });
    
    describe('message', function(){
      beforeEach(function(){
        StateRegistry = function(){
          return [{init: jasmine.createSpy('init'), name: 'Draw'}, {init: jasmine.createSpy('init'), name: 'Play'}];
        };
        app = new App(Game, Mediator, StateRegistry);
      });

      describe('and add one message', function(){
        it('should add the message to the game\'s messages', function(){
          Mediator.publish('messages-add', 'test message');
          expect(app.game.$messages.length).toEqual(1);
          expect(app.game.$messages[0]).toEqual('test message');
        });
      });
      
      describe('and has one message, then clear messages', function(){
        it('should have a 1 message, then none', function(){
          Mediator.publish('messages-add', 'test message');
          Mediator.publish('messages-clear');
          expect(app.game.$messages.length).toEqual(0);
        });
      });
      
      describe('push 3 messages and then clear', function(){
        it('should have a length of 3, and then 0', function(){
          Mediator.publish('messages-add', 'test message');
          Mediator.publish('messages-add', 'test message');
          Mediator.publish('messages-add', 'test message');
          expect(app.game.$messages.length).toEqual(3);
          Mediator.publish('messages-clear');
          expect(app.game.$messages.length).toEqual(0);
        });
      });
    });
  });
});
