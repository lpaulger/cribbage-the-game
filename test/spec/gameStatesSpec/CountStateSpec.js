define(['gameStates/CountState', 'modules/CardModule'], function(CountState, Card){
  'use strict';
  var _countState, _game, _player1, _player2;

  function createBasicGame() {
    _player1 = {
      name: 'bob',
      possessive: 'his',
      hand: [],
      points: 0,
      isWinner: function(){
        return false;
      },
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
      isWinner: function(){
        return false;
      },
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
      $messages: [],
      settings: {
        countPointsManually: false
      },
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
          //spyOn(_countState.mediator, 'publish');
          spyOn(_countState.scoreKeeper, 'evaluateHand');
        });

        it('show non crib holders hand', function () {
          _countState.init();
          expect(_game.$player1HandVisible).toBe(false);
          expect(_game.$player2HandVisible).toBe(true);
        });

        it('should call scoreKeeper.evaluateHand fo player2', function(){
          _countState.init();
          expect(_countState.scoreKeeper.evaluateHand).toHaveBeenCalledWith(_player2, _game.topCard);
        });

        describe('and on step 1', function(){
          beforeEach(function(){
            _countState.game.countStateStep = 1;
            spyOn(_countState, 'render');
          });

          afterEach(function(){
            _countState.game.countStateStep = 0;
          });

          it('should simply render previous messages', function () {
            _countState.init();
            expect(_countState.render).toHaveBeenCalled();
          });
        });
      });

      describe('and player2 is crib owner', function(){
        beforeEach(function(){
          createBasicGame();
          _countState = new CountState(_game);
          spyOn(_countState.scoreKeeper, 'evaluateHand');
          _countState.init();
        });

        it('show non crib holders hand', function () {
          expect(_game.$player1HandVisible).toBe(true);
          expect(_game.$player2HandVisible).toBe(false);
        });

        it('should call scoreKeeper.evaluateHand for player1', function(){
          expect(_countState.scoreKeeper.evaluateHand).toHaveBeenCalledWith(_player1, _game.topCard);
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
            spyOn(_countState.mediator, 'publish');
            spyOn(_countState.scoreKeeper, 'evaluateHand');
            _countState.init();
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
        });
        describe('and its second count', function(){
          beforeEach(function () {
            _game.$cribOwner = _game.$player1;
            _countState = new CountState(_game);
            spyOn(_countState.mediator, 'publish');
            spyOn(_countState.scoreKeeper, 'evaluateHand');
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
            expect(_countState.mediator.publish).toHaveBeenCalledWith('transition', 'Deal');
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
            spyOn(_countState.mediator, 'publish');
            spyOn(_countState.scoreKeeper, 'evaluateHand');
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

          it('should be on step 1', function () {
            expect(_countState.game.countStateStep).toEqual(1);//on step 1
            _countState.action();
            expect(_countState.game.countStateStep).toEqual(2);//proceed to step 2 after action
          });
        });

        describe('and its second count', function () {
          beforeEach(function () {
            _game.$cribOwner = _game.$player2;
            _countState = new CountState(_game);
            spyOn(_countState.scoreKeeper, 'evaluateHand');
            spyOn(_countState.mediator, 'publish');
            _countState.init();
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
            expect(_countState.game.countStateStep).toEqual(2);//on step 2
            _countState.action();
            expect(_countState.game.countStateStep).toEqual(3);//proceed to step 3
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
            expect(_countState.mediator.publish).toHaveBeenCalledWith('transition', 'Deal');
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
            expect(_countState.game.countStateStep).toEqual(3);
            _countState.action();
            expect(_countState.game.countStateStep).toEqual(0);
          });
        });
      });
    });

    describe('Manually score points enabled', function(){
      beforeEach(function(){
        _game.settings.countPointsManually = true;
      });

      describe('and its third count', function(){
        beforeEach(function(){
          _game.$cribOwner = _game.$player1;
          _countState = new CountState(_game);
          spyOn(_countState.mediator, 'publish');
          _countState.init(); //0 -> 1
          _countState.action();//1 -> 2
          _countState.action();//2 -> 1 -> 2
        });

        it('should not remove the players hand after player selects score', function(){
          expect(_player1.crib.length).toEqual(4);
          _countState.action();
          expect(_player1.crib.length).toEqual(0);
          expect(_player1.hand.length).toEqual(4);
          _countState.action();
          expect(_player1.hand.length).toEqual(4);
        });
      });
    });
  });
});
