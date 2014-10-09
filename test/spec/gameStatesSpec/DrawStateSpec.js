define(['gameStates/DrawState'], function(DrawState){
  'use strict';
  var _draw,
  _game = {
    $player1: {hand:{faceValue: 1}},
    $player2: {hand:{faceValue: 2}},
    $deck:{
      shuffle: function(){},
      cut: function(){
        return this.cards.pop();
      }
    }
  },
  _newGame = {};

  describe('Draw', function () {
    it('should create Draw State', function () {
      _draw = new DrawState(_game);
      expect(typeof _draw).toBe('object');
    });

    describe('init', function(){
      beforeEach(function(){
        _draw = new DrawState(_game);
        spyOn(_draw.mediator, 'publish');
      });

      it('should publish a message to draw from the deck', function(){
        _draw.init();
        expect(_draw.mediator.publish).toHaveBeenCalledWith('messages-add', 'Click the Deck to Start');
      });
    });

    describe('Draw Methods', function(){
      beforeEach(function(){
        _draw = new DrawState(_game);
      });

      describe('Click Deck', function(){
        beforeEach(function(){
          spyOn(_game.$deck, 'cut').and.returnValue({faceValue: 1});
          _draw.deck();
        });

        it('should cut the deck', function () {
          expect(_game.$deck.cut.calls.count()).toEqual(2);
        });
      });

      describe('p1 draws lower card', function(){
        beforeEach(function(){
          _game.$deck.cards = [
            {faceValue:2},
            {faceValue:1}
          ];
        });

        it('should set p1 as cribOwner', function(){
          _draw.deck();
          expect(_game.$player1).toEqual(_game.$cribOwner);
        });
      });

      describe('p2 draws lower card', function(){
        beforeEach(function(){
          _game.$deck.cards = [
            {faceValue:1},
            {faceValue:2}
          ];
        });

        it('should set p2 as cribOwner', function(){
          _draw.deck();
          expect(_game.$player2).toEqual(_game.$cribOwner);
        });
      });
    });
  });
});