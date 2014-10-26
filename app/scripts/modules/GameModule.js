define(
  ['modules/DeckModule', 'modules/PlayerModule', 'modules/PlayerAiModule', 'modules/BoardModule', 'modules/PlayScoreKeeper'],
  function(Deck, Player, PlayerAi, Board, ScoreKeeper){

    'use strict';
    function Game(options){
      this.$deck = options.$deck || new Deck();

      options.$board.scoreKeeper = new ScoreKeeper();
      this.$board = new Board(options.$board);

      options.$player1.board = this.$board;
      this.$player1 = new Player(options.$player1 || {
        name: 'You',
        possessive: 'Your',
        board: this.$board
      });

      options.$player2.board = this.$board;
      this.$player2 = new PlayerAi(options.$player2 || {
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
