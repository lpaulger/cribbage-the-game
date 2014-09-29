define(['gameStates/CountState'], function(CountState){
  'use strict';
  var _countState, _game, _player1, _player2;

  function createBasicGame() {
    _player1 = {
      name: 'bob',
      hand: [],
      handInMemory: new Array(4),
      restoreHand: function(){}
    };
    _player2 = {
      name: 'sally',
      hand: [],
      handInMemory: new Array(4),
      restoreHand: function(){}
    };
    _game = {
      $player1: _player1,
      $player2: _player2,
      $cribOwner: _player2,
      $showTopCard: true,
      transitionTo: function(){}
    };
  }

  describe('CountState', function () {
    beforeEach(function(){
      createBasicGame();
    });
    it('should create CountState', function () {
      _countState = new CountState(_game);
    });

    describe('init', function () {
      beforeEach(function () {
        spyOn(_player1, 'restoreHand');
        spyOn(_player2, 'restoreHand');
        _countState = new CountState(_game);
        _countState.init();
      });

      describe('and player1 is crib owner', function(){
        beforeEach(function(){
          createBasicGame();
          _game.$cribOwner = _game.$player1;
          _countState = new CountState(_game);
          _countState.init();
        });
        it('show non crib holders hand', function () {
          expect(_game.$player1HandVisible).toBe(false);
          expect(_game.$player2HandVisible).toBe(true);
        });
      });

      describe('and player2 is crib owner', function(){
        beforeEach(function(){
          createBasicGame();
          _countState = new CountState(_game);
          _countState.init();
        });
        it('show non crib holders hand', function () {
          expect(_game.$player1HandVisible).toBe(true);
          expect(_game.$player2HandVisible).toBe(false);
        });
      });

      it('should set each players hand to their original hand', function(){
        expect(_player1.restoreHand).toHaveBeenCalled();
        expect(_player2.restoreHand).toHaveBeenCalled();
      });
    });

    describe('action', function(){
      describe('and player is cribOwner', function(){
        describe('and is first count', function(){
          beforeEach(function(){
            createBasicGame();
            _game.$cribOwner = _game.$player1;
            _countState = new CountState(_game);
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

          it('should show p2\'s score in a message', function(){
            expect(_game.$messages[0]).toBe(_game.$player2.name + ' Score: ');
          });
        });
        describe('and its second count', function(){
          beforeEach(function () {
            _game.$cribOwner = _game.$player1;
            _countState = new CountState(_game);
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
        });
        describe('and its third count', function () {
          beforeEach(function () {
            _game.$cribOwner = _game.$player1;
            spyOn(_game, 'transitionTo');
            _countState = new CountState(_game);
            _countState.init();
            _countState.action();
            _countState.action();
          });

          it('should transition to Deal State', function () {
            _countState.action();
            expect(_game.transitionTo).toHaveBeenCalledWith('Deal', true);
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
            expect(_game.$messages[0]).toBe(_game.$player1.name + ' Score: ');
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
        });
        describe('and its third count', function () {
          beforeEach(function () {
            _game.$cribOwner = _game.$player2;
            spyOn(_game, 'transitionTo');
            _countState = new CountState(_game);
            _countState.init();
            _countState.action();
            _countState.action();
          });

          it('should transition to Deal State', function () {
            _countState.action();
            expect(_game.transitionTo).toHaveBeenCalledWith('Deal', true);
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