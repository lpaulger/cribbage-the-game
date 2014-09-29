define(['gameStates/DrawState'], function(DrawState){
  'use strict';
  var _draw, _game = {$player1: {},$player2: {}};
  describe('Draw', function () {
    it('should create Draw State', function () {
      _draw = new DrawState(_game);
      expect(typeof _draw).toBe('object');
    });

    describe('when deck is clicked', function () {
      it('should display a winner', function () {
        
      });
    });
  });
});