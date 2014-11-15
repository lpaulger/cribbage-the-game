define(['scripts/gameStates/HomeState'], function(HomeState){
  'use strict';

  describe('HomeState', function(){
    describe('Constructor', function(){
      it('should create HomeState', function(){
        var homeState = new HomeState();
        expect(homeState).toBeDefined();
      });
    });
  });
});
