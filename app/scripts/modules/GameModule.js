define(
  ['modules/DeckModule', 'modules/PlayerModule', 'modules/PlayerAiModule', 'modules/BoardModule', 'modules/PlayScoreKeeper', 'modules/SettingsModule'],
  function(Deck, Player, PlayerAi, Board, ScoreKeeper, Settings){

    'use strict';
    function Game(options){
      this.$deck = new Deck(options.$deck);

      var boardSettings = {scoreKeeper:new ScoreKeeper()};
      for(var attrname in options.$board){
        boardSettings[attrname] = options.$board[attrname];
      }
      this.$board = new Board(boardSettings);

      var player1Settings = {
        name:      'you',
        possessive:'your',
        board:     this.$board
      };
      for(attrname in options.$player1){
        player1Settings[attrname] = options.$player1[attrname];
      }
      this.$player1 = new Player(player1Settings);

      var player2Settings = {
        name:      'Opponent',
        possessive:'their',
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

      if(options.currentPlayer){
        this.currentPlayer = [this.$player1, this.$player2].filter(function(player){
          return player.name === options.currentPlayer;
        })[0];
      }

      this.$messages = options.$messages || [];

      this.$settings = Settings.load();

      //countState && DrawState
      this.$player1HandVisible = options.$player1HandVisible || true;
      this.$player2HandVisible = options.$player2HandVisible || true;

      //countState
      this.countStateStep = options.countStateStep;

      //countState && prePlayState
      this.topCard = options.topCard;
      this.$showTopCard = options.$showTopCard;

      //countState && dealState && playState
      this.$action = options.$action;

      //playState
      this.isScorePoints = options.isScorePoints || false;
    }

    return Game;
  });
