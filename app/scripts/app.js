define(['modules/GameModule', 'modules/Mediator', 'gameStates/StateRegistry', 'modules/StorageModule'],
  function(Game, Mediator, StateRegistry, Storage){
    'use strict';

    function App(){
      this.mediator = Mediator;
      this.storage = Storage;
      this.stateRegistry = new StateRegistry();

      this.mediator.subscribe('start', startGame.bind(this));
      this.mediator.subscribe('continue', continueGame.bind(this));
      this.mediator.subscribe('transition', transitionTo.bind(this));
      this.mediator.subscribe('messages-add', setMessages.bind(this));
      this.mediator.subscribe('messages-clear', clearMessages.bind(this));
      this.mediator.subscribe('winner', setWinner.bind(this));
      this.mediator.subscribe('board-clear', function(){
        this.game.$board.clearBoard();
      }.bind(this));
    }

    App.prototype.init = function(){
      var data = this.storage.loadGame();
      if(data.game){
        this.game = new Game(data.game);
        this.stateRegistry = new StateRegistry();
        this.mediator.publish('transition', data.state);
      } else {
        this.mediator.publish('transition', 'Home');
      }
    };

    function setMessages(message){
      this.game.$messages.push(message);
    }

    function clearMessages(){
      if(this.game)
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
        if(this.game)
          this.storage.saveGame(this.game, state.name);
      }

      if(wait){
        setTimeout(function(){
          process.call(this);
        }.bind(this), 1000);
      } else {
        process.call(this);
      }
    }

    function continueGame(){
      var storage = this.storage.loadGame();
      this.game = new Game(storage.game);
      this.stateRegistry = new StateRegistry();
      this.mediator.publish('transition', storage.state);
    }

    function startGame(){
      this.game = new Game({});
      this.game.$board.clearBoard();
      this.stateRegistry = new StateRegistry();
      this.mediator.publish('transition', 'Draw');
    }

    return App;
  });
