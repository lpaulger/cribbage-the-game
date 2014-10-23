define([], function(){
  'use strict';

  function get(key){
    return localStorage.getItem(key);
  }

  function set(key, value){
    return localStorage.setItem(key, value);
  }

  return {
    loadGame: function(){
      return {
        game: get('game'),
        state: get('state')
      };
    },
    saveGame: function(game, state){
      set('game', JSON.stringify(game));
      set('state', state);
    }
  };
});