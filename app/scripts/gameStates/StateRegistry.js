define(['gameStates/DrawState', 'gameStates/DealState', 'gameStates/CribState',
        'gameStates/PrePlayState', 'gameStates/PlayState', 'gameStates/CountState',
        'gameStates/SummaryState'],
  function (DrawState, DealState, CribState, PrePlayState, PlayState, CountState, SummaryState) {
    'use strict';
    function StateManager(game){
      return [new DrawState(game),
         new DealState(game),
         new CribState(game),
         new PrePlayState(game),
         new PlayState(game),
         new CountState(game),
         new SummaryState(game)];
    }

    return StateManager;
  });
