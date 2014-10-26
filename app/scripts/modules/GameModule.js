define(
  ['modules/DeckModule', 'modules/PlayerModule', 'modules/PlayerAiModule', 'modules/BoardModule', 'modules/PlayScoreKeeper'],
  function(Deck, Player, PlayerAi, Board, ScoreKeeper){

    'use strict';
    function Game(options){
      this.$deck = options.$deck || new Deck();
      this.$board = options.$board || new Board({
        scoreKeeper: new ScoreKeeper()
      });
      this.$player1 = options.$player1 || new Player({
        name: 'You',
        possessive: 'Your',
        board: this.$board
      });
      this.$player2 = options.$player2 || new PlayerAi({
        name: 'Roboto',
        possessive: 'his',
        board: this.$board
      });
      this.$player1HandVisible = options.$player1HandVisible || true;
      this.$player2HandVisible = options.$player2HandVisible || true;
      this.$messages = options.$messages || [];
    }

    return Game;
  });
