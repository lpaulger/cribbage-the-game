define([],
  function(){
    'use strict';

    function transitionTo(stateName, wait){
      var state;
      function process(){
        state = this.states.filter(function(state){
          return state.name === stateName;
        })[0];
        if(!state)
          throw new Error('State ' + stateName + ' Not Found');

        state.init();
      }

      if(wait){
        setTimeout(function(){
          process.call(this);
        }.bind(this), 1000);
      } else {
        process.call(this);
      }
    }

    function startGame(){
      this.states[0].init();
    }

    function App(Game, Mediator, StateRegistry){
      this.game = new Game();
      this.mediator = Mediator;
      this.states = new StateRegistry(this.game);

      this.mediator.subscribe('start', startGame.bind(this));

      this.mediator.subscribe('transition', transitionTo.bind(this));

//      this.mediator.subscribe('winner', function(player){
//        console.log('winner');
//        console.log(player);
//
//        this.mediator.publish('transition', 'Summary');
//      });
    }

    App.prototype.init = function(){
      this.mediator.publish('start');
    };

    return App;
  });
