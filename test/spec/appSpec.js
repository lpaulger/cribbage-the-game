define(['scripts/app'], function(App){
  'use strict';

  describe('App', function(){
    describe('constructor', function(){
      var app;
      beforeEach(function(){
        app = new App();
      });

      it('should create an App', function(){
        expect(typeof app).toBe('object');
      });

      it('should have a mediator', function(){
        expect(app.mediator).toBeDefined();
      });
    });

    describe('init', function(){
      var app;
      beforeEach(function(){
        app = new App();
      });

      it('should publish the App:Start event', function(){
        app.init();
        expect(app.mediator.publish).toHaveBeenCalledWith('App:Start');
      });
    });
  });

});
