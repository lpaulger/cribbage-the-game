define(['gameStates/SummaryState'], function(SummaryState){
  'use strict';

  describe('SummaryState', function(){
    describe('Constructor', function(){
      it('should define the summary state', function(){
        var summaryState = new SummaryState({});

        expect(summaryState).toBeDefined();
      });
    });

    describe('template', function(){
      it('should use a different page template', function(){

      });
    });
  });
});