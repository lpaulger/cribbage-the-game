define(['scripts/gameStates/SummaryState'], function(SummaryState){
  'use strict';

  describe('SummaryState', function(){
    describe('Constructor', function(){
      it('should define the summary state', function(){
        summaryState = new SummaryState({});

        expect(summaryState).toBeDefined();
      });
    });
  });
});
