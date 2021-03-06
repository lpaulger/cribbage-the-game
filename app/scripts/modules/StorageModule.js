define([], function(){
  'use strict';

  function get(key){
    return localStorage.getItem(key);
  }

  function set(key, value){
    return localStorage.setItem(key, value);
  }

  function savePlayerOne(game){
    return {
      name:         game.$player1.name,
      possessive:   game.$player1.possessive,
      hand:         game.$player1.hand,
      handInMemory: game.$player1.handInMemory,
      crib:         game.$player1.crib,
      points:       game.$player1.points,
      currentPoints:game.$player1.currentPoints,
      selectedScore:game.$player1.selectedScore
    };
  }

  function savePlayerTwo(game){
    return {
      name:         game.$player2.name,
      possessive:   game.$player2.possessive,
      hand:         game.$player2.hand,
      handInMemory: game.$player2.handInMemory,
      crib:         game.$player2.crib,
      points:       game.$player2.points,
      currentPoints:game.$player2.currentPoints
    };
  }

  function saveCribOwner(game){
    if(game.$cribOwner)
      return game.$cribOwner.name;
  }

  function saveCurrentPlayer(game){
      if(game.currentPlayer)
        return game.currentPlayer.name;
    }

  function saveBoard(game){
    return {
      currentBoardValue:       game.$board.currentBoardValue,
      totalPlayedCardsForRound:game.$board.totalPlayedCardsForRound,
      playedCards:             game.$board.playedCards,
      playersWhoSaidGo:        game.$board.playersWhoSaidGo //not simple object
    };
  }

  return {
    loadSettings: function(){
      return JSON.parse(get('settings'));
    },

    saveSettings:function(settings){
      set('settings', JSON.stringify(settings));
    },
    loadGame:function(){
      return {
        game: JSON.parse(get('game')),
        state:get('state')
      };
    },
    saveGame:function(game, state){
      set('game', JSON.stringify({
        $deck:              game.$deck,
        $player1:           savePlayerOne(game),
        $player2:           savePlayerTwo(game),
        $cribOwner:         saveCribOwner(game),
        $player1HandVisible:game.$player1HandVisible,
        $player2HandVisible:game.$player2HandVisible,
        countStateStep:     game.countStateStep,
        topCard:            game.topCard,
        showTopCard:        game.$showTopCard,
        $board:             saveBoard(game),
        $messages:          game.$messages,
        $action:            game.$action,
        currentPlayer:      saveCurrentPlayer(game),
        isScorePoints:      game.isScorePoints
      }));
      set('state', state);
    }
  };
});
