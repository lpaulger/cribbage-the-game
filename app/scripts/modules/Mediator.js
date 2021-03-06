define(['modules/PubSub', 'modules/GameModule', 'gameStates/StateRegistry', 'modules/StorageModule'],
  function(PubSub, Game, StateRegistry, Storage){
    'use strict';

    function Mediator(){
      PubSub.installTo(this);

      PubSub.subscribe('App:Start', this.appInit);
      PubSub.subscribe('start', this.startGame);
      PubSub.subscribe('continue', this.continueGame);
      PubSub.subscribe('transition', this.transitionTo);
      PubSub.subscribe('messages-add', this.setMessages);
      PubSub.subscribe('messages-clear', this.clearMessages);
      PubSub.subscribe('winner', this.setWinner);
      PubSub.subscribe('board-clear', this.clearBoard);
      PubSub.subscribe('render', this.saveGame);
    }

    Mediator.prototype.appInit = function(){
      this.stateRegistry = new StateRegistry();

      var data = Storage.loadGame();
      if(data.game){
        this.game = new Game(data.game);
        PubSub.publish('transition', data.state);
      } else {
        PubSub.publish('transition', 'Home');
      }
    };

    Mediator.prototype.startGame = function(){
      this.game = new Game({});
      this.game.$board.clearBoard();
      this.stateRegistry = new StateRegistry();
      PubSub.publish('transition', 'Draw');
    };

    Mediator.prototype.continueGame = function(){
      var storage = Storage.loadGame();
      this.game = new Game(storage.game);
      this.stateRegistry = new StateRegistry();
      PubSub.publish('transition', storage.state);
    };

    Mediator.prototype.transitionTo = function(stateName, wait){
      var state;
      if(stateName === 'Back'){
        stateName = Storage.loadGame().state || 'Home';
      }

      function process(){
        state = this.stateRegistry.initState(stateName, this.game);
        state.init();
      }

      if(wait)
        setTimeout(process.bind(this), 1000);
      else
        process.call(this);
    };



    Mediator.prototype.setMessages = function(message){
      function applySentenceCase(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
      }
      message = applySentenceCase(message);
      if(this.game.$messages.indexOf(message) === -1)
        this.game.$messages.push(message);
    };

    Mediator.prototype.clearMessages = function(){
      if(this.game)
        this.game.$messages = [];
    };

    Mediator.prototype.setWinner = function(player){
      this.game.winner = player;
    };

    Mediator.prototype.clearBoard = function(){
      this.game.$board.clearBoard();
    };

    Mediator.prototype.saveGame = function(state, game){
      if(state !== 'Home' && state !== 'Info' && state !== 'Settings'){
        Storage.saveGame(game, state);
      }
    };

    return Mediator;
  });
