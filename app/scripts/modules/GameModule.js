define(
  ['modules/DeckModule', 'modules/PlayerModule', 'modules/PlayerAiModule', 'gameStates/StateRegistry', 'modules/BoardSingleton'],
  function(Deck, Player, PlayerAi, StateRegistry, Board){

    'use strict';
    function Game(){
      this.$deck = new Deck();
      this.$player1 = new Player('You', 'your');
      this.$player2 = new PlayerAi('Roboto', 'his');
      this.$player1HandVisible = true;
      this.$player2HandVisible = true;
      this.$board = Board.getInstance();
      this.$messages = ['Click the Deck to Start'];
      this.$states = new StateRegistry(this);
      this.$state = this.$states[0];
    }

    Game.prototype.start = function(){
      this.$state.init();
      this.$state.render();
    };

    Game.prototype.transitionTo = function (stateName, wait) {
      function process(){
        this.$state = this.$states.filter(function(state){
          return state.name === stateName;
        })[0];
        if(!this.$state)
          throw new Error('State ' + stateName + ' Not Found');

        this.start();
      }

      this.$state.render();
      if(wait){
        setTimeout(function(){
          process.call(this);
        }.bind(this), 1000);
      } else {
        process.call(this);
      }
    };

    return Game;
  });
