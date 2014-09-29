define(['gameStates/DrawState'], function(DrawState){
  'use strict';
  var _draw,
      _game = {
        $player1: {hand:{faceValue: 1}},
        $player2: {hand:{faceValue: 2}},
        $deck:{
          shuffle: function(){},
          cut: function(){}
        },
        transitionTo: function(){}
      };
  describe('Draw', function () {
    it('should create Draw State', function () {
      _draw = new DrawState(_game);
      expect(typeof _draw).toBe('object');
    });

    describe('Draw Methods', function(){
      beforeEach(function(){
        _draw = new DrawState(_game);
      });
      describe('Click Deck', function(){
        beforeEach(function(){
          spyOn(_game.$deck, 'cut').and.returnValue({faceValue: 1});
          spyOn(_game, 'transitionTo');
          _draw.deck();
        });

        it('should cut the deck', function () {
          expect(_game.$deck.cut.calls.count()).toEqual(2);
        });
      });
    });
  });
});