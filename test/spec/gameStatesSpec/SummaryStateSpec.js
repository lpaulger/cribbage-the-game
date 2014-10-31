define(['scripts/gameStates/SummaryState', 'jquery'], function(SummaryState, $){
  'use strict';

  describe('SummaryState', function(){
    var summaryState, game = {
      $player1: {possessive: 'Your'},
      $player2: {possessive: 'Robo\'s'}
    };
    describe('Constructor', function(){
      it('should define the summary state', function(){
        summaryState = new SummaryState({});

        expect(summaryState).toBeDefined();
      });
    });

    describe('template', function(){
      beforeEach(function(){
        setFixtures(sandbox({id: 'summaryTemplate'}));
        summaryState = new SummaryState(game);
      });

      it('should use a different page template', function(){
        expect(summaryState.templates().page).toBeDefined();
      });
    });

    describe('bindEvents', function(){
      beforeEach(function(){
        summaryState = new SummaryState(game);
        spyOn(summaryState.mediator, 'publish');
      });

      describe('newGameButton', function(){
        var newGameSpy;
        beforeEach(function(){
          setFixtures(sandbox({id: 'newGameButton'}));
          newGameSpy = spyOnEvent('#newGameButton', 'click');
          summaryState.bindEvents();
          $('#newGameButton').click();
        });

        it('should bind the newGame button', function(){
          expect(newGameSpy).toHaveBeenTriggered();
        });

        it('should publish transition event, to draw', function(){
          expect(summaryState.mediator.publish).toHaveBeenCalledWith('start');
        });
      });

      describe('homeButton', function(){
        var homeSpy;
        beforeEach(function(){
          setFixtures(sandbox({id: 'homeButton'}));
          homeSpy = spyOnEvent('#homeButton', 'click');
          summaryState.bindEvents();
          $('#homeButton').click();
        });

        it('should bind the home button', function(){
          expect(homeSpy).toHaveBeenTriggered();
        });

        it('should publish transition event, to draw', function(){
          expect(summaryState.mediator.publish).toHaveBeenCalledWith('transition', 'Home');
        });
      });
    });
  });
});
