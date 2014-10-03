define(['gameStates/BaseState'], function (BaseState) {
  'use strict';
  describe('BaseState', function () {
    var game = {};
    describe('Constructor', function(){
      it('should return a base State', function(){
        var baseState = new BaseState(game);
        expect(baseState).toBeDefined();
      });
    });

    describe('templates', function(){
      var baseState;
      beforeEach(function(){
        baseState = new BaseState(game);
      });

      it('should return an object of templates', function(){
        var templates = baseState.templates();
        expect(templates).toBeDefined();
      });
    });
  });
});