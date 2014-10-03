define(['app'], function(app) {
  'use strict';
  describe('App', function() {
    describe('init', function(){
      it('should create a game', function(){
        app.init();
        expect(app.$game).toBeDefined();
        expect(app.$game.start).toBeDefined();
      });
    });
  });
});
