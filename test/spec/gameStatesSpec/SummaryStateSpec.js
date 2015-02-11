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

    describe('render', function(){
      var summaryState;
      beforeEach(function(){
        summaryState = new SummaryState({});
        spyOn(summaryState, 'templates').and.callThrough();
        spyOn(summaryState, 'bindEvents').and.callThrough();
      });

      it('should render templates', function(){
        summaryState.render();
        expect(summaryState.templates).toHaveBeenCalled();
      });

      it('should bind events', function(){
        summaryState.render();
        expect(summaryState.bindEvents).toHaveBeenCalled();
      });
    });
  });
});
