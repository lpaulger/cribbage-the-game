define([],
  function(){
    'use strict';

    function App(Game, Mediator, StateRegistry){
      this.game = new Game();
      this.mediator = Mediator;
      this.states = new StateRegistry(this.game);

      this.mediator.subscribe('start', startGame.bind(this));

      this.mediator.subscribe('transition', transitionTo.bind(this));

      this.mediator.subscribe('messages-add', setMessages.bind(this));
      this.mediator.subscribe('messages-clear', clearMessages.bind(this));
    }

    App.prototype.init = function(){
      this.mediator.publish('start');
    };

    function setMessages(message){
      this.game.$messages.push(message);
    }

    function clearMessages(){
      this.game.$messages = [];
    }

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

    return App;
  });
