define(['scripts/gameStates/BaseState'], function (BaseState) {
  'use strict';

  describe('BaseState', function () {
    var game = {$player1: {}, $player2: {}};
    var baseState;
    beforeEach(function(){
      baseState = new BaseState(game);
    });

    describe('Constructor', function(){
      describe('and game is passed', function(){
        it('should return a base State', function(){
          expect(baseState).toBeDefined();
          expect(baseState.p1).toBeDefined();
          expect(baseState.p2).toBeDefined();
        });
      });

      describe('if no game object passed', function(){
        beforeEach(function(){
          baseState = new BaseState();
        });

        it('should not set player1 or player2', function(){
          expect(baseState).toBeDefined();
          expect(baseState.p1).not.toBeDefined();
          expect(baseState.p2).not.toBeDefined();
        });
      });
    });

    describe('init', function(){
      beforeEach(function(){
        spyOn(baseState, 'render');
      });

      it('should call render', function(){
        baseState.init();
        expect(baseState.render).toHaveBeenCalled();
      });
    });

    describe('deck', function(){
      beforeEach(function(){
        spyOn(baseState, 'render');
      });

      it('should call render', function(){
        baseState.deck();
        expect(baseState.render).toHaveBeenCalled();
      });
    });

    describe('selectCard', function(){
      beforeEach(function(){
        spyOn(baseState, 'render');
      });

      it('should call render', function(){
        baseState.selectCard();
        expect(baseState.render).toHaveBeenCalled();
      });
    });

    describe('action', function(){
      beforeEach(function(){
        spyOn(baseState, 'render');
      });

      it('should call render', function(){
        baseState.action();
        expect(baseState.render).toHaveBeenCalled();
      });
    });
  });
});
