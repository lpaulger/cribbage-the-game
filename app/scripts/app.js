define(['modules/Mediator', 'gameStates/StateRegistry'],
  function(Mediator, StateRegistry){
    'use strict';

    function App(Game){
      this.game = new Game();
      this.states = new StateRegistry(this.game);
    }

    App.prototype.init = function(){
      Mediator.subscribe('start', function(){
        this.states[0].init();
      }.bind(this));

      Mediator.subscribe('transition', function(stateName, wait){
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
      }.bind(this));

      Mediator.subscribe('winner', function(player){
        console.log('winner');
        console.log(player);

        Mediator.publish('transition', 'Summary');
      });

      Mediator.publish('start');
    };

    return App;
  });
