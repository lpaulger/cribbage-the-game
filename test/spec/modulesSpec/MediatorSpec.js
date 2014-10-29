define(['modules/Mediator', 'modules/PubSub', 'modules/StorageModule'],
  function(Mediator, PubSub, Storage){
    //NOTE: Game Object is Mocked -- see test/mocks and test-main.js
    'use strict';

    describe('Mediator', function(){
      describe('constructor', function(){
        var mediator;
        beforeEach(function(){
          mediator = new Mediator();
        });

        afterEach(function(){
          mediator = undefined;
        });

        it('should create a new Mediator object', function(){
          expect(typeof mediator).toBe('object');
        });
      });
      describe('Events', function(){
        var mediator;
        beforeEach(function(){
          mediator = new Mediator();
          spyOn(PubSub, 'publish');
        });

        afterEach(function(){
          mediator = undefined;
        });

        describe('When App:Start occurs', function(){
          describe('and no game exists', function(){
            beforeEach(function(){
              localStorage.clear();
              mediator.appInit();
            });

            it('should create a new StateRegistry', function(){
              expect(mediator.stateRegistry).toBeDefined();
            });

            it('should transition to Home State', function(){
              expect(PubSub.publish).toHaveBeenCalledWith('transition', 'Home');
            });
          });

          describe('and a saved game exists', function(){
            var game, state;
            beforeEach(function(){
              game = {};
              state = 'Draw';
              spyOn(Storage, 'loadGame').and.returnValue({game:game, state:state});
              mediator.appInit();
            });

            it('it should set the game', function(){
              expect(mediator.game).toBeDefined();
            });

            it('should go to the loaded State', function(){
              expect(PubSub.publish).toHaveBeenCalledWith('transition', 'Draw');
            });
          });
        });

        describe('When Game:Start occurs', function(){
          beforeEach(function(){
            mediator.startGame();
          });

          it('should create a new game', function(){
            expect(mediator.game).toBeDefined();
          });

          it('should create a new StateRegistry', function(){
            expect(mediator.stateRegistry).toBeDefined();
          });

          it('should proceed to Draw State', function(){
            expect(PubSub.publish).toHaveBeenCalledWith('transition', 'Draw');
          });
        });

        describe('When Game:Continue occurs', function(){
          var data;
          beforeEach(function(){
            data = {game:{}, state: 'Draw'};
            spyOn(Storage, 'loadGame').and.returnValue(data);
            mediator.continueGame();
          });

          it('should load the game', function(){
            expect(Storage.loadGame).toHaveBeenCalled();
          });

          it('should transitionTo the loaded state', function(){
            expect(PubSub.publish).toHaveBeenCalledWith('transition', 'Draw');
          });
        });

        describe('When Game:TransitionTo occurs', function(){
          var state;
          beforeEach(function(){
            jasmine.clock().install();
            state = {init:jasmine.createSpy('init')};
            mediator.startGame();
            spyOn(mediator.stateRegistry, 'initState').and.returnValue(state);
          });

          afterEach(function(){
            jasmine.clock().uninstall();
          });

          describe('and the transition should wait', function(){
            beforeEach(function(){
              mediator.transitionTo('Draw', true);
            });

            it('should wait one second before transitioning', function(){
              expect(mediator.stateRegistry.initState).not.toHaveBeenCalled();
              jasmine.clock().tick(1001);
              expect(mediator.stateRegistry.initState).toHaveBeenCalledWith('Draw', mediator.game);
            });

            it('should initialize the loaded state', function(){
              expect(state.init).not.toHaveBeenCalled();
              jasmine.clock().tick(1001);
              expect(state.init).toHaveBeenCalled();
            });
          });

          describe('and the transition should not wait', function(){
            beforeEach(function(){
              mediator.transitionTo('Draw');
            });

            it('should load the requested state', function(){
              expect(mediator.stateRegistry.initState).toHaveBeenCalledWith('Draw', mediator.game);
            });

            it('should initialize the loaded state', function(){
              expect(state.init).toHaveBeenCalled();
            });
          });
        });

        describe('When Game:Save occurs', function(){
          beforeEach(function(){
            spyOn(Storage, 'saveGame');
          });

          describe('and the game exists', function(){
            var game, state;
            beforeEach(function(){
              game = {};
              state = 'Draw';
              mediator.startGame();
              mediator.saveGame(game, state);
            });

            it('should save the game', function(){
              expect(Storage.saveGame).toHaveBeenCalledWith(state, game);
            });
          });

          describe('and the game doesn\'t exist', function(){
            beforeEach(function(){
              mediator.saveGame('Draw', undefined);
            });

            it('should not save the game', function(){
              expect(Storage.saveGame).not.toHaveBeenCalled();
            });
          });
        });

        describe('When Game:Winner occurs', function(){
          var player;
          beforeEach(function(){
            player = {};
            mediator.startGame();
            mediator.setWinner(player);
          });

          it('should set the games winner', function(){
            expect(mediator.game.winner).toBe(player);
          });
        });

        describe('When Messages:Set occurs', function(){
          describe('and the message is new', function(){
            beforeEach(function(){
              mediator.startGame();
              mediator.setMessages('Testing');
            });

            it('should store the new message', function(){
              expect(mediator.game.$messages.length).toBe(1);
              expect(mediator.game.$messages[0]).toBe('Testing');
            });
          });

          describe('and the message already exists', function(){
            var message;
            beforeEach(function(){
              message = 'Testing';
              mediator.startGame();
              mediator.setMessages(message);
            });

            it('should not not the message again', function(){
              mediator.setMessages(message);
              expect(mediator.game.$messages.length).toBe(1);
              expect(mediator.game.$messages[0]).toBe('Testing');
              expect(mediator.game.$messages[1]).not.toBeDefined();
            });
          });
        });

        describe('When Messages:Clear occurs', function(){
          beforeEach(function(){
            mediator.startGame();
            mediator.setMessages('Testing');
          });

          it('should empty the messages array', function(){
            expect(mediator.game.$messages.length).toBe(1);
            mediator.clearMessages();
            expect(mediator.game.$messages.length).toBe(0);
          });
        });

        describe('When Board:Clear occurs', function(){
          beforeEach(function(){
            mediator.startGame();
            mediator.clearBoard();
          });

          it('should clear the games board', function(){
            expect(mediator.game.$board.clearBoard).toHaveBeenCalled();
            expect(mediator.game.$board.clearBoard.calls.count()).toEqual(2);
          });
        });
      });
    });
  });
