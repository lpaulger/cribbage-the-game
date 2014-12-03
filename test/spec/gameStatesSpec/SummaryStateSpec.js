define(['gameStates/SummaryState'], function(SummaryState){
  'use strict';

  describe('SummaryState', function(){
    var summaryState;
    describe('Constructor', function(){
      it('should define the summary state', function(){
        summaryState = new SummaryState({});
        expect(summaryState).toBeDefined();
      });
    });
  });
});
