define(['gameStates/HomeState'], function(HomeState){
  'use strict';

  describe('HomeState', function(){
    describe('Constructor', function(){
      it('should create HomeState', function(){
        var homeState = new HomeState();
        expect(homeState).toBeDefined();
      });
    });

    describe('render', function(){
      var homeState;
      beforeEach(function(){
        homeState = new HomeState({});
        spyOn(homeState, 'templates').and.callThrough();
        spyOn(homeState, 'bindEvents').and.callThrough();
      });

      it('should render templates', function(){
        homeState.render();
        expect(homeState.templates).toHaveBeenCalled();
      });

      it('should bind events', function(){
        homeState.render();
        expect(homeState.bindEvents).toHaveBeenCalled();
      });
    });
  });
});
