define([], function(){
  'use strict';

  function get(key){
    return localStorage.getItem(key);
  }

  function set(key, value){
    return localStorage.setItem(key, value);
  }

  return {
    loadGame:function(){
      return {
        game: JSON.parse(get('game')),
        state:get('state')
      };
    },
    saveGame:function(game, state){
      set('game', JSON.stringify({
        $deck:              game.$deck,
        $player1:           {
          name:        game.$player1.name,
          possessive:  game.$player1.possessive,
          hand:        game.$player1.hand,
          handInMemory:game.$player1.handInMemory,
          crib:        game.$player1.crib,
          cardsForCrib:game.$player1.cardsForCrib,
          points:      game.$player1.points
        },
        $player2:           {
          name:        game.$player2.name,
          possessive:  game.$player2.possessive,
          hand:        game.$player2.hand,
          handInMemory:game.$player2.handInMemory,
          crib:        game.$player2.crib,
          cardsForCrib:game.$player2.cardsForCrib,
          points:      game.$player2.points
        },
        $player1HandVisible:game.$player1HandVisible,
        $player2HandVisible:game.$player2HandVisible,
        $board:             {
          currentBoardValue:       game.$board.currentBoardValue,
          totalPlayedCardsForRound:game.$board.totalPlayedCardsForRound,
          playedCards:             game.$board.playedCards,
          playersWhoSaidGo:        game.$board.playersWhoSaidGo
        },
        $messages:          game.$messages
      }));
      set('state', state);
    }
  };
});
