define(['gameStates/CountState', 'modules/CardModule'], function(CountState, Card){
  'use strict';
  var _countState, _game, _player1, _player2;

  function createBasicGame() {
    _player1 = {
      name: 'bob',
      possessive: 'his',
      hand: [],
      points: 0,
      handInMemory: [
        new Card(1, 'hearts'),
        new Card(3, 'hearts'),
        new Card(4, 'hearts'),
        new Card(6, 'hearts')
      ],
      crib: [
        new Card(1, 'hearts'),
        new Card(3, 'hearts'),
        new Card(4, 'hearts'),
        new Card(6, 'hearts')
      ],
      restoreHand: function(){}
    };
    _player2 = {
      name: 'sally',
      possessive: 'her',
      hand: [],
      points: 0,
      handInMemory: [
        new Card(1, 'clubs'),
        new Card(3, 'clubs'),
        new Card(4, 'clubs'),
        new Card(6, 'clubs')
      ],
      crib: [
        new Card(1, 'hearts'),
        new Card(3, 'hearts'),
        new Card(4, 'hearts'),
        new Card(6, 'hearts')
      ],
      restoreHand: function(){}
    };
    _game = {
      $player1: _player1,
      $player2: _player2,
      $cribOwner: _player2,
      $showTopCard: true,
      topCard: new Card(10, 'diams')
    };
  }

  describe('CountState', function () {
    beforeEach(function(){
      createBasicGame();
    });

    it('should create CountState', function () {
      _countState = new CountState(_game);
      expect(_countState).toBeDefined();
    });

    it('should have a CountScoreKeeperInstance', function(){
      _countState = new CountState(_game);
      expect(_countState.scoreKeeper).toBeDefined();
    });

    describe('init', function () {
      beforeEach(function () {
        spyOn(_player1, 'restoreHand');
        spyOn(_player2, 'restoreHand');
        _countState = new CountState(_game);
        spyOn(_countState.mediator, 'publish');
        _countState.init();
      });

      describe('and player1 is crib owner', function(){
        beforeEach(function(){
          createBasicGame();
          _game.$cribOwner = _game.$player1;
          _countState = new CountState(_game);
          spyOn(_countState.scoreKeeper, 'evaluateHand').and.callFake(function(){
            return 15;
          });
          _countState.init();
        });

        it('show non crib holders hand', function () {
          expect(_game.$player1HandVisible).toBe(false);
          expect(_game.$player2HandVisible).toBe(true);
        });
        
        it('should call scoreKeeper.evaluateHand fo player2', function(){
          expect(_countState.scoreKeeper.evaluateHand).toHaveBeenCalledWith(_player2, _game.topCard);
        });
        
        it('should set player2\'s score', function(){
          expect(_player2.points).toEqual(15);
        });
        
        it('should show a message with player 2\'s score', function(){
          expect(_game.$messages[0]).toEqual('sally scored 15 points.');
        });
      });

      describe('and player2 is crib owner', function(){
        beforeEach(function(){
          createBasicGame();
          _countState = new CountState(_game);
          spyOn(_countState.scoreKeeper, 'evaluateHand').and.callFake(function(){
            return 15;
          });
          _countState.init();
        });

        it('show non crib holders hand', function () {
          expect(_game.$player1HandVisible).toBe(true);
          expect(_game.$player2HandVisible).toBe(false);
        });

        it('should call scoreKeeper.evaluateHand for player1', function(){
          expect(_countState.scoreKeeper.evaluateHand).toHaveBeenCalledWith(_player1, _game.topCard);
        });

        it('should set player1\'s score', function(){
          expect(_player1.points).toEqual(15);
        });

        it('should show a message with player 1\'s score', function(){
          expect(_game.$messages[0]).toEqual('bob scored 15 points.');
        });
      });

      it('should set each players hand to their original hand', function(){
        expect(_player1.restoreHand).toHaveBeenCalled();
        expect(_player2.restoreHand).toHaveBeenCalled();
      });
    });

    describe('action', function(){
      describe('and player1 is cribOwner', function(){
        describe('and is first count', function(){
          beforeEach(function(){
            createBasicGame();
            _game.$cribOwner = _game.$player1;
            _countState = new CountState(_game);
            _countState.init();
            spyOn(_countState.scoreKeeper, 'evaluateHand').and.callFake(function(){
              return 15;
            });
            _game.$player1.hand = _game.$player1.handInMemory;
            _game.$player2.hand = _game.$player2.handInMemory;
          });

          it('should remove the cards from p2\'s hand', function(){
            expect(_game.$player2.hand.length).toBe(4);
            _countState.action();
            expect(_game.$player2.hand.length).toBe(0);
          });

          it('should show p1\'s hand', function(){
            expect(_game.$player1HandVisible).toBe(false);
            expect(_game.$player2HandVisible).toBe(true);
            _countState.action();
            expect(_game.$player1HandVisible).toBe(true);
            expect(_game.$player2HandVisible).toBe(false);
          });
          
          it('should calculate player1\'s hand', function(){
            _countState.action();
            expect(_player1.points).toEqual(15);
          });

          it('should show p1\'s score in a message', function(){
            _countState.action();
            expect(_game.$messages[0]).toBe(_player1.name + ' scored ' + _player1.points + ' points.');
          });
        });
        describe('and its second count', function(){
          beforeEach(function () {
            _game.$cribOwner = _game.$player1;
            _countState = new CountState(_game);
            spyOn(_countState.scoreKeeper, 'evaluateHand').and.callFake(function(){
              return 15;
            });
            _countState.init();
            _game.$player1.hand = _game.$player1.handInMemory;
            _game.$player1.crib = new Array(4);
            _game.$player2.hand = _game.$player2.handInMemory;
            _countState.action();
          });

          it('should put cards from crib in players hand', function () {
            var _cribValue = _game.$player1.crib;
            _countState.action();
            expect(_game.$player1.hand).toBe(_cribValue);
          });

          it('should empty the crib', function () {
            _countState.action();
            expect(_game.$player1.crib).toEqual([]);
          });
          
          it('should set player1 points', function(){
            _countState.action();
            expect(_player1.points).toEqual(30);
          });
          
          it('should evaluate player1\'s hand for points', function(){
            _countState.action();
            expect(_countState.scoreKeeper.evaluateHand.calls.count()).toBe(3);
          });
        });

        describe('and its third count', function () {
          beforeEach(function () {
            _game.$cribOwner = _game.$player1;
            _countState = new CountState(_game);
            spyOn(_countState.mediator, 'publish');
            _countState.init();
            _countState.action();
            _countState.action();
          });

          it('should transition to Deal State', function () {
            _countState.action();
            expect(_countState.mediator.publish).toHaveBeenCalledWith('transition', 'Deal', true);
          });

          it('should set the crib owner to player2', function () {
            _countState.action();
            expect(_game.$cribOwner).toBe(_game.$player2);
          });

          it('should set players hand to visible', function () {
            _countState.action();
            expect(_game.$player1HandVisible).toBe(true);
          });

          it('should set bots hand to not visible', function () {
            _countState.action();
            expect(_game.$player2HandVisible).toBe(false);
          });

          it('should turn over top card', function(){
            expect(_game.$showTopCard).toBe(true);
            _countState.action();
            expect(_game.$showTopCard).toBe(false);
          });
        });
      });

      describe('and bot is cribOwner', function () {
        describe('and is first count', function () {
          beforeEach(function () {
            createBasicGame();
            _game.$cribOwner = _game.$player2;
            _countState = new CountState(_game);
            spyOn(_countState.scoreKeeper, 'evaluateHand').and.callFake(function(){
              return 15;
            });
            _countState.init();
            _game.$player1.hand = _game.$player1.handInMemory;
            _game.$player2.hand = _game.$player2.handInMemory;
          });
          
          it('should remove the cards from p1\'s hand', function () {
            expect(_game.$player1.hand.length).toBe(4);
            _countState.action();
            expect(_game.$player1.hand.length).toBe(0);
          });

          it('should show p2\'s hand', function () {
            expect(_game.$player2HandVisible).toBe(false);
            expect(_game.$player1HandVisible).toBe(true);
            _countState.action();
            expect(_game.$player2HandVisible).toBe(true);
            expect(_game.$player1HandVisible).toBe(false);
          });

          it('should show p1\'s score in a message', function () {
            expect(_game.$messages[0]).toBe(_player1.name + ' scored 15 points.');
          });

          it('should be on step 1', function () {
            expect(_countState.step).toEqual(0);
            _countState.action();
            expect(_countState.step).toEqual(1);
          });
        });

        describe('and its second count', function () {
          beforeEach(function () {
            _game.$cribOwner = _game.$player2;
            _countState = new CountState(_game);
            _countState.init();
            spyOn(_countState.scoreKeeper, 'evaluateHand').and.callFake(function(){
              return 15;
            });
            _game.$player1.hand = _game.$player1.handInMemory;
            _game.$player1.crib = new Array(4);
            _game.$player2.hand = _game.$player2.handInMemory;
            _countState.action();
          });

          it('should put cards from crib in bots hand', function () {
            var _cribValue = _game.$player2.crib;
            _countState.action();
            expect(_game.$player2.hand).toBe(_cribValue);
          });

          it('should empty the crib', function () {
            _countState.action();
            expect(_game.$player2.crib).toEqual([]);
          });

          it('should be on step 2', function () {
            expect(_countState.step).toEqual(1);
            _countState.action();
            expect(_countState.step).toEqual(2);
          });

          it('should add points to player2\'s hand', function(){
            _countState.action();
            expect(_game.$player2.points).toBe(30);
          });

          it('it should display message', function(){
            _countState.action();
            expect(_game.$messages[0]).toEqual('her crib scored 15 points.');
          });
        });

        describe('and its third count', function () {
          beforeEach(function () {
            _game.$cribOwner = _game.$player2;
            _countState = new CountState(_game);
            spyOn(_countState.mediator, 'publish');
            _countState.init();
            _countState.action();
            _countState.action();
          });

          it('should transition to Deal State', function () {
            _countState.action();
            expect(_countState.mediator.publish).toHaveBeenCalledWith('transition', 'Deal', true);
          });

          it('should set the crib owner to player2', function () {
            _countState.action();
            expect(_game.$cribOwner).toBe(_game.$player1);
          });

          it('should set players hand to visible', function () {
            _countState.action();
            expect(_game.$player1HandVisible).toBe(true);
          });

          it('should set bots hand to not visible', function () {
            _countState.action();
            expect(_game.$player2HandVisible).toBe(false);
          });

          it('should set step to 0', function () {
            expect(_countState.step).toEqual(2);
            _countState.action();
            expect(_countState.step).toEqual(0);
          });
        });
      });
    });
  });
});