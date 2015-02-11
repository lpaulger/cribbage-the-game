define(['gameStates/StateRegistry'], function(StateRegistry){
  'use strict';
  var stateRegistry;
  describe('StateRegistry', function(){
    describe('Constructor', function(){
      it('should create new StateRegistry', function(){
        stateRegistry = new StateRegistry({});
        expect(stateRegistry).toBeDefined();
      });
    });

    describe('requesting a state', function(){
      beforeEach(function(){
        stateRegistry = new StateRegistry({});
      });

      it('should inject the new state into the stateRegistry', function(){
        var state = stateRegistry.getState('Home');
        expect(state.name).toBe('Home');
        expect(typeof state).toBe('object');
      });

      describe('and the state does not exist', function(){
        it('throw an error', function(){
          expect(function(){
            stateRegistry.getState('Fake');
          }).toThrowError('FakeState Not Found');
        });
      });

    });
  });
});
