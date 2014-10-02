define(['gameStates/DealState'], function(DealState) {
  'use strict';

  describe('DealState', function () {
    var game = {
      $player1: {
        possessive: 'your'
      },
      $deck: function(){},
      $player2: {},
      options: {
        showOpponentsHand: false
      },
      transitionTo: function(){}
    },
    dealState;

    describe('Constructor', function(){
      it('should create DealState Obj', function(){
        dealState = new DealState(game);
        expect(dealState).toBeDefined();
        expect(typeof dealState).toEqual('object');
      });
    });
    
    describe('init', function(){
      beforeEach(function(){
        spyOn(game, 'transitionTo');
        dealState = new DealState(game);
        spyOn(game.$deck, 'shuffle');
        spyOn(game.$deck, 'deal').and.returnValue({
          topHand: [{faceValue: 1},{faceValue: 4},{faceValue: 1},{faceValue: 2},{faceValue: 6},{faceValue: 1}],
          bottomHand: [{faceValue: 10},{faceValue: 1},{faceValue: 6},{faceValue: 6},{faceValue: 9},{faceValue: 1}]
        });
        game.$cribOwner = game.$player1;
        dealState.init();
      });
      
      it('should create a deck', function(){
        expect(game.$deck).toBeDefined();
      });
      
      it('should shuffle the deck', function(){
        expect(game.$deck.shuffle).toHaveBeenCalled();
        expect(game.$deck.shuffle.calls.count()).toEqual(1);
      });
      
      it('should deal two hands', function(){
        expect(game.$deck.deal).toHaveBeenCalled();
        expect(game.$deck.deal.calls.count()).toEqual(1);
      });

      it('should display a message', function(){
        expect(game.$messages[0]).toEqual('select two cards for your crib');
      });
      
      it('should transitionTo Crib State', function(){
        expect(game.transitionTo).toHaveBeenCalledWith('Crib');
      });
    });
  });
});