define(['gameStates/DrawState', 'gameStates/DealState', 'gameStates/CribState', 'gameStates/PrePlayState'],
  function (DrawState, DealState, CribState, PrePlayState) {

    function StateManager(game){
      return [new DrawState(game),
         new DealState(game),
         new CribState(game),
         new PrePlayState(game)];
    }

    return StateManager;
});
