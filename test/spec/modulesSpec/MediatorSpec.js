define(['modules/Mediator', 'modules/PubSub'], function(Mediator, PubSub){
  'use strict';

  describe('Mediator', function(){
    describe('constructor', function(){
      var mediator;
      beforeEach(function(){
        mediator = new Mediator();
      });

      afterEach(function(){
        mediator = undefined;
      });

      it('should create a new Mediator object', function(){
        expect(typeof mediator).toBe('object');
      });
    });
    describe('Events', function(){
      var mediator;
      beforeEach(function(){
        mediator = new Mediator();
      });

      afterEach(function(){
        mediator = undefined;
      });

      ddescribe('When App:Start occurs', function(){
        beforeEach(function(){
          localStorage.clear();
        });

        it('should create a new StateRegistry', function(){
          mediator.appInit();
          expect(mediator.stateRegistry).toBeDefined();
        });
      });
    });
  });
});
