define(['scripts/gameStates/SummaryState'], function(SummaryState){
  'use strict';

  describe('SummaryState', function(){
    var summaryState, game = {
      $player1: {possessive: 'Your'},
      $player2: {possessive: 'Robo\'s'}
    };
    describe('Constructor', function(){
      it('should define the summary state', function(){
        summaryState = new SummaryState({});

        expect(summaryState).toBeDefined();
      });
    });
  });
});
