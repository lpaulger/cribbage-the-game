define(
  ['modules/DeckModule', 'modules/PlayerModule', 'modules/PlayerAiModule', 'modules/BoardModule', 'modules/PlayScoreKeeper'],
  function(Deck, Player, PlayerAi, Board, ScoreKeeper){

    'use strict';
    function Game(options){
      this.$deck = new Deck(options.$deck);

      var boardSettings = {scoreKeeper:new ScoreKeeper()};
      for(var attrname in options.$board){
        boardSettings[attrname] = options.$board[attrname];
      }
      this.$board = new Board(boardSettings);

      var player1Settings = {
        name:      'You',
        possessive:'Your',
        board:     this.$board
      };
      for(attrname in options.$player1){
        player1Settings[attrname] = options.$player1[attrname];
      }
      this.$player1 = new Player(player1Settings);

      var player2Settings = {
        name:      'Roboto',
        possessive:'his',
        board:     this.$board
      };
      for(attrname in options.$player2){
        player2Settings[attrname] = options.$player2[attrname];
      }
      this.$player2 = new PlayerAi(player2Settings);

      if(options.$cribOwner){
        this.$cribOwner = [this.$player1, this.$player2].filter(function(player){
          return player.name === options.$cribOwner;
        })[0];
      }

      this.$player1HandVisible = options.$player1HandVisible || true;
      this.$player2HandVisible = options.$player2HandVisible || true;
      this.$messages = options.$messages || [];

      this.topCard = options.topCard || undefined;
      this.$showTopCard = options.$showTopCard || undefined;
      this.$action = options.$action || undefined;
    }

    return Game;
  });
