define(['gameStates/DrawState', 'gameStates/DealState', 'gameStates/CribState',
        'gameStates/PrePlayState', 'gameStates/PlayState'],
  function (DrawState, DealState, CribState, PrePlayState, PlayState) {

    function StateManager(game){
      return [new DrawState(game),
         new DealState(game),
         new CribState(game),
         new PrePlayState(game),
         new PlayState(game)];
    };

    return StateManager;
});
