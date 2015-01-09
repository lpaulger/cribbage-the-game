define(['gameStates/InfoState'], function(InfoState){
  'use strict';

  describe('HomeState', function(){
    describe('Constructor', function(){
      it('should create HomeState', function(){
        var infoState = new InfoState();
        expect(infoState).toBeDefined();
      });
    });

    describe('render', function(){
      var infoState;
      beforeEach(function(){
        infoState = new InfoState();
        spyOn(infoState, 'templates').and.callThrough();
        spyOn(infoState, 'bindEvents').and.callThrough();
      });

      it('should render templates', function(){
        infoState.render();
        expect(infoState.templates).toHaveBeenCalled();
      });

      it('should bind events', function(){
        infoState.render();
        expect(infoState.bindEvents).toHaveBeenCalled();
      });
    });
  });
});
