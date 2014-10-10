define(['gameStates/BaseState', 'jquery'], function (BaseState, $) {
  'use strict';

  describe('BaseState', function () {
    var game = {$player1: {}, $player2: {}};
    var baseState;
    beforeEach(function(){
      baseState = new BaseState(game);
    });

    describe('Constructor', function(){
      describe('and game is passed', function(){
        it('should return a base State', function(){
          expect(baseState).toBeDefined();
          expect(baseState.p1).toBeDefined();
          expect(baseState.p2).toBeDefined();
        });
      });
      
      describe('if no game object passed', function(){
        beforeEach(function(){
          baseState = new BaseState();
        });

        it('should not set player1 or player2', function(){
          expect(baseState).toBeDefined();
          expect(baseState.p1).not.toBeDefined();
          expect(baseState.p2).not.toBeDefined();
        });
      });
    });

    describe('templates', function(){
      it('should return an object of templates', function(){
        var templates = baseState.templates();
        expect(templates).toBeDefined();
      });
    });

    describe('init', function(){
      beforeEach(function(){
        spyOn(baseState, 'render');
      });

      it('should call render', function(){
        baseState.init();
        expect(baseState.render).toHaveBeenCalled();
      });
    });

    describe('deck', function(){
      beforeEach(function(){
        spyOn(baseState, 'render');
      });

      it('should call render', function(){
        baseState.deck();
        expect(baseState.render).toHaveBeenCalled();
      });
    });

    describe('selectCard', function(){
      beforeEach(function(){
        spyOn(baseState, 'render');
      });

      it('should call render', function(){
        baseState.selectCard();
        expect(baseState.render).toHaveBeenCalled();
      });
    });

    describe('action', function(){
      beforeEach(function(){
        spyOn(baseState, 'render');
      });

      it('should call render', function(){
        baseState.action();
        expect(baseState.render).toHaveBeenCalled();
      });
    });
    
    describe('bindEvents', function(){
      var spyEvent;
      describe('deck click', function(){
        beforeEach(function(){
          setFixtures(sandbox({id: 'deck'}));
          baseState.bindEvents();
          spyEvent = spyOnEvent('#deck', 'click');
          spyOn(baseState, 'deck');

          $('#deck').click();
        });

        it('should unbind the events', function(){
          expect(spyEvent).toHaveBeenTriggered();
        });
        
        it('should call the state deck method', function(){
          expect(baseState.deck).toHaveBeenCalled();
        });
      });

      describe('bottomHand click', function(){
        beforeEach(function(){
          loadFixtures('bottomHand.html');
          baseState.bindEvents();
          spyEvent = spyOnEvent('#bottomHand', 'click');
          spyOn(baseState, 'selectCard');
          $('#bottomHand li').click();
        });

        it('should unbind the events', function(){
          expect(spyEvent).toHaveBeenTriggered();
        });

        it('should call the state deck method', function(){
          expect(baseState.selectCard).toHaveBeenCalled();
        });
      });

      describe('controls click', function(){
        beforeEach(function(){
          loadFixtures('controls.html');
          baseState.bindEvents();
          spyEvent = spyOnEvent('#controls', 'click');
          spyOn(baseState, 'action');

          $('#controls button').click();
        });

        it('should unbind the events', function(){
          expect(spyEvent).toHaveBeenTriggered();
        });

        it('should call the state deck method', function(){
          expect(baseState.action).toHaveBeenCalled();
        });
      });
    });
  });
});