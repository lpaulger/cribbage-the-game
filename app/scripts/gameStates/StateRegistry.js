/*jshint -W098 */
define(['gameStates/DrawState', 'gameStates/DealState', 'gameStates/CribState',
        'gameStates/PrePlayState', 'gameStates/PlayState', 'gameStates/CountState',
        'gameStates/SummaryState', 'gameStates/HomeState', 'gameStates/InfoState',
        'gameStates/SettingsState'],
  function (DrawState, DealState, CribState, PrePlayState, PlayState, CountState, SummaryState, HomeState, InfoState, SettingsState) {
    'use strict';

    function StateManager(game){
      this.states = [
        new DrawState(game),new DealState(game),new CribState(game),new PrePlayState(game),new PlayState(game),
        new CountState(game),new SummaryState(game),new HomeState(game),new InfoState(game),new SettingsState(game)
      ];
    }

    StateManager.prototype.getState = function(stateName){
      var state;
      state = this.states.filter(function(state){
        return state.name === stateName;
      })[0];
      if(!state){
        throw new Error(stateName + 'State Not Found');
      }

      return state;
    };

    return StateManager;
  });
