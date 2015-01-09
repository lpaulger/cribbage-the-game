define(['gameStates/PlayState', 'modules/PlayerModule','modules/SettingsModule'], function(PlayState, Player, Settings){
  'use strict';

  var _playState, _game, _player, _bot;

  function setupBasicGame(){
    Settings.save([
      {
        id: 'manual-count',
        value: false
      },
      {
        id: 'action-confirmation',
        value: false
      }
    ]);
    var board = {currentBoardValue:0};
    _player = new Player({name:'test', possessive:'his', hand:[{value:3}], board:board});
    _bot = new Player({name:'test', possessive:'his', hand:[{value:2}], board:board});

    _game = {
      transitionTo: function(){
      },
      currentPlayer:_player,
      $player1:     _player,
      $player2:     _bot,
      $action: {
        text: '...'
      },
      isScorePoints: false
    };
  }

  describe('PlayState', function(){
    beforeEach(function(){
      setupBasicGame();
    });

    afterEach(function(){
      _game = undefined;
    });

    it('should create PlayState', function(){
      _playState = new PlayState(_game);
      expect(typeof _playState).toBe('object');
    });

    describe('initialize', function(){
      describe('and ai turn', function(){
        beforeEach(function(){
          spyOn(_bot, 'playCard');
         _game.currentPlayer = _bot;
          _playState = new PlayState(_game);
          spyOn(_playState.mediator, 'publish');
          spyOn(_playState, 'unbindEvents');
          _playState.nextState = 'Play';
        });

        it('should process AI turn', function(){
          _playState.init();
          expect(_bot.playCard).toHaveBeenCalled();
        });
      });
    });

    describe('Action Clicked', function(){
      describe('and they have no playable cards', function(){
        beforeEach(function(){
          spyOn(_player, 'announceGo');
          spyOn(_player, 'getSelectedCards').and.returnValue([]);
          _player.hand = [];
          _playState = new PlayState(_game);
          spyOn(_playState.mediator, 'publish');
          spyOn(_playState, 'unbindEvents');
          _playState.nextState = 'Play';
          _playState.action();
        });

        it('should announce go for the player', function(){
          expect(_playState.p1.announceGo).toHaveBeenCalled();
        });
      });

      describe('and they have playable cards', function(){
        beforeEach(function(){
          _playState = new PlayState(_game);
          spyOn(_playState.mediator, 'publish');
          spyOn(_player, 'playCard');
          _playState.nextState = 'Play';
          _playState.action();
        });

        it('should not announce go for the player', function(){
          expect(_player.playCard).not.toHaveBeenCalled();
        });

        it('should let the user know it has playable cards', function(){
          expect(_playState.mediator.publish).toHaveBeenCalledWith('messages-add', 'You can\'t go, you have playable cards.');
        });
      });
    });

    describe('is end of round', function(){
      beforeEach(function(){
        _playState = new PlayState(_game);
        _playState.init();
        spyOn(_playState.mediator, 'publish');
        _playState.nextState = 'Count';
      });

      it('should transition to Count state', function(){
        expect(_playState.nextState).toBe('Count');
        _playState.action();
        expect(_playState.mediator.publish).toHaveBeenCalledWith('transition', 'Count', false);
        expect(_playState.nextState).toBe('Play');
      });

      it('should clear the board', function(){
        _playState.action();
        expect(_playState.mediator.publish).toHaveBeenCalledWith('board-clear');
      });
    });

    describe('Action Confirmation disabled', function(){
      beforeEach(function(){

      });

      describe('When player selects a valid card', function(){
        function setup(){
          spyOn(_player, 'playCard');
          _playState = new PlayState(_game);
          spyOn(_playState.mediator, 'publish');
          spyOn(_playState, 'unbindEvents').and.callThrough();
          _playState.selectCard({index:1});
        }

        describe('and is end of the round', function(){
          beforeEach(function(){
            //empty hands indicated end of round
            _player.hand = [];
            _bot.hand = [];
            setup();
          });

          it('should play card', function(){
            expect(_player.playCard).toHaveBeenCalledWith(1);
          });

          it('should transition back to Play without waiting', function(){
            expect(_playState.mediator.publish).toHaveBeenCalledWith('transition', 'Play', false);
          });
        });

        describe('and not the end of the round', function(){
          beforeEach(function(){
            _player.hand = [{value:10}];
            setup();
          });

          it('should transition back to Play and not wait', function(){
            expect(_playState.mediator.publish).toHaveBeenCalledWith('transition', 'Play', false);
          });
        });
      });

      describe('when player selects invalid card', function(){
        beforeEach(function(){
          spyOn(_player, 'playCard').and.throwError('No Playable Cards');
          _playState = new PlayState(_game);
          spyOn(_playState.mediator, 'publish');
          _playState.selectCard({index:1});
        });

        it('should play card', function(){
          expect(_player.playCard).toHaveBeenCalledWith(1);
        });

        it('should throw error', function(){
          expect(_player.playCard).toThrowError('No Playable Cards');
        });
      });
    });

    describe('Manual Count Enabled', function(){
      describe('and Action Confirmation Enabled', function(){
        describe('when user confirms a card selection', function(){
          beforeEach(function(){
            var settings = [
              {
                id:'action-confirmation',
                value: true
              },
              {
                id: 'manual-count',
                value: true
              }
            ];
            Settings.save(settings);

            _playState = new PlayState(_game);
            _playState.nextState = 'Play';
            _playState.selectCard({index: 0});

            spyOn(_player, 'placeCardOnTable');
            spyOn(_player, 'playCard');
          });

          it('should place the card on the table', function(){
            _playState.action();
            expect(_player.placeCardOnTable).toHaveBeenCalledWith(0);
          });

          it('should display the score control', function(){
            expect(_playState.game.isScorePoints).toBe(false);
            _playState.action();
            expect(_playState.game.isScorePoints).toBe(true);
          });

          it('should not play selected card', function(){
            _playState.action();
            expect(_player.playCard).not.toHaveBeenCalled();
          });
        });
      });

      describe('Action Confirmation Disabled', function(){
        beforeEach(function(){
          var settings = [
            {
              id:   'action-confirmation',
              value:false
            },
            {
              id:   'manual-count',
              value:true
            }
          ];
          Settings.save(settings);
          _playState = new PlayState(_game);
          _playState.nextState = 'Play';


          spyOn(_player, 'placeCardOnTable');
          spyOn(_player, 'playCard');
          spyOn(_player, 'selectCard');
        });

        it('the user shouldn\'t be able to select a card twice', function(){
          _playState.selectCard({index:0});
          _playState.selectCard({index:0});
          expect(_player.selectCard.calls.count()).toEqual(1);
        });
      });
    });
  });
});
