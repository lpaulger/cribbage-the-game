define(
  ['modules/DeckModule', 'modules/PlayerModule', 'modules/PlayerAiModule', 'modules/BoardSingleton'],
  function(Deck, Player, PlayerAi, Board){

    'use strict';
    function Game(){
      this.$deck = new Deck();
      this.$player1 = new Player('You', 'your');
      this.$player2 = new PlayerAi('Roboto', 'his');
      this.$player1HandVisible = true;
      this.$player2HandVisible = true;
      this.$board = Board.getInstance();
      this.$messages = [];
    }

    return Game;
  });
