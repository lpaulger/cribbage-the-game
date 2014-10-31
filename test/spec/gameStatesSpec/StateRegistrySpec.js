define(['scripts/gameStates/StateRegistry'], function(StateRegistry){
  'use strict';
  var stateRegistry;
  describe('StateRegistry', function(){
    describe('Constructor', function(){
      it('should create new StateRegistry', function(){
        stateRegistry = new StateRegistry();
        expect(stateRegistry).toBeDefined();
      });
    });

    describe('initializing a state', function(){
      beforeEach(function(){
        stateRegistry = new StateRegistry();
      });

      describe('and the state exists', function(){
        describe('and the state has not been initialized', function(){
          it('should inject the new state into the stateRegistry', function(){
            stateRegistry.initState('Home');
            expect(stateRegistry.states.length).toBe(1);
            expect(stateRegistry.states[0].name).toBe('Home');
            expect(typeof stateRegistry.states[0]).toBe('object');
          });
        });

        describe('and the state has been initialized', function(){
          beforeEach(function(){
            stateRegistry.initState('Home');
          });

          it('should not inject the new state into the registry', function(){
            stateRegistry.initState('Home');
            expect(stateRegistry.states.length).toBe(1);
            expect(stateRegistry.states[0].name).toBe('Home');
            expect(typeof stateRegistry.states[0]).toBe('object');
          });
        });
      });

      describe('and the state does not exist', function(){
        it('throw an error', function(){
          expect(function(){
            stateRegistry.initState('Fake');
          }).toThrowError('FakeState Not Found');
        });
      });
    });
  });
});
