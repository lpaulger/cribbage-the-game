define(['gameStates/DrawState', 'gameStates/DealState', 'gameStates/CribState',
        'gameStates/PrePlayState', 'gameStates/PlayState', 'gameStates/CountState'],
  function (DrawState, DealState, CribState, PrePlayState, PlayState, CountState) {

    function StateManager(game){
      return [new DrawState(game),
         new DealState(game),
         new CribState(game),
         new PrePlayState(game),
         new PlayState(game),
         new CountState(game)];
    };

    return StateManager;
});
