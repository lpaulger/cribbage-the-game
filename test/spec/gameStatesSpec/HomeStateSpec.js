define(['scripts/gameStates/HomeState', 'jquery'], function(HomeState, $){
  'use strict';

  describe('HomeState', function(){
    var homeState;
    describe('Constructor', function(){
      it('should create HomeState', function(){
        var homeState = new HomeState();
        expect(homeState).toBeDefined();
      });
    });

    describe('template', function(){
      beforeEach(function(){
        setFixtures(sandbox({id: 'homeTemplate'}));
        homeState = new HomeState();
      });

      it('should use a different page template', function(){
        expect(homeState.templates().page).toBeDefined();
      });
    });

    describe('bindEvents', function(){
      var newGameSpy;
      beforeEach(function(){
        setFixtures(sandbox({id: 'newGameButton'}));
        newGameSpy = spyOnEvent('#newGameButton', 'click');

        homeState = new HomeState();
        spyOn(homeState.mediator, 'publish');
        homeState.bindEvents();
      });

      describe('newGameButton', function(){
        beforeEach(function(){
          $('#newGameButton').click();
        });

        it('should bind the newGame button', function(){
          expect(newGameSpy).toHaveBeenTriggered();
        });

        it('should publish transition event, to draw', function(){
          expect(homeState.mediator.publish).toHaveBeenCalledWith('start');
        });
      });
    });
  });
});
