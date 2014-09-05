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
      $cribOwner: _player2
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
        spyOn(_player1, "restoreHand");
        spyOn(_player2, "restoreHand");
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

          xit('should show p1\'s score in a message', function(){
            expect(_game.$messages).toBe([_game.$player1.name + ' Score: ']);
          });
        });

        describe('and its second count', function(){

        })
      });
    });
  });
});