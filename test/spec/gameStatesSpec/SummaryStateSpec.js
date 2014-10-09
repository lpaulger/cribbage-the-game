define(['gameStates/SummaryState', 'jquery'], function(SummaryState, $){
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
        loadFixtures('summaryTemplate.html');
        summaryState = new SummaryState(game);
      });

      it('should use a different page template', function(){
        expect(summaryState.templates().page).toBeDefined();
      });
    });

    describe('bindEvents', function(){
      var newGameSpy, homeSpy;
      beforeEach(function(){
        loadFixtures('summaryTemplate.html');
        newGameSpy = spyOnEvent('#newGameButton', 'click');
        homeSpy = spyOnEvent('#homeButton', 'click');

        summaryState = new SummaryState(game);
        spyOn(summaryState.mediator, 'publish');
        summaryState.bindEvents();
      });

      describe('newGameButton', function(){
        beforeEach(function(){
          $('#newGameButton').click();
        });

        it('should bind the newGame button', function(){
          expect(newGameSpy).toHaveBeenTriggered();
        });

        it('should publish transition event, to draw', function(){
          expect(summaryState.mediator.publish).toHaveBeenCalledWith('transition', 'Draw');
        });
      });

      describe('homeButton', function(){
        beforeEach(function(){
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