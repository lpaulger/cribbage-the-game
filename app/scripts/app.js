define(['modules/GameModule', 'modules/Mediator', 'gameStates/StateRegistry'],
  function(Game, Mediator, StateRegistry){
    'use strict';

    function App(){
      this.mediator = Mediator;
      this.game = new Game();
      this.stateRegistry = new StateRegistry();
      this.mediator.subscribe('start', startGame.bind(this));
      this.mediator.subscribe('transition', transitionTo.bind(this));
      this.mediator.subscribe('messages-add', setMessages.bind(this));
      this.mediator.subscribe('messages-clear', clearMessages.bind(this));
      this.mediator.subscribe('winner', setWinner.bind(this));
      this.mediator.subscribe('board-clear', function(){
        this.game.$board.clearBoard();
      }.bind(this));
    }

    App.prototype.init = function(){
      this.mediator.publish('transition', 'Home');
    };

    function setMessages(message){
      this.game.$messages.push(message);
    }

    function clearMessages(){
      this.game.$messages = [];
    }

    function setWinner(player){
      this.game.winner = player;
    }

    function transitionTo(stateName, wait){
      var state;
      function process(){
        state = this.stateRegistry.initState(stateName, this.game);
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
      this.game = new Game();
      this.game.$board.clearBoard();
      this.stateRegistry = new StateRegistry();
      this.mediator.publish('transition', 'Draw');
    }

    return App;
  });
