/*jshint -W098 */
define(['scripts/gameStates/DrawState', 'scripts/gameStates/DealState', 'scripts/gameStates/CribState',
        'scripts/gameStates/PrePlayState', 'scripts/gameStates/PlayState', 'scripts/gameStates/CountState',
        'scripts/gameStates/SummaryState', 'scripts/gameStates/HomeState', 'scripts/gameStates/InfoState'],
  function (DrawState, DealState, CribState, PrePlayState, PlayState, CountState, SummaryState, HomeState, InfoState) {
    'use strict';

    function StateManager(){
      this.states = [];
    }

    StateManager.prototype.initState = function(stateName, game){
      var state;
      state = this.states.filter(function(state){
        return state.name === stateName;
      })[0];
      if(!state){
        try{
          /*jshint evil:true */
          state = eval('new ' + stateName + 'State(game)');
        } catch (e) {
          throw new Error(stateName + 'State Not Found');
        }

        this.states.push(state);
      }

      return state;
    };

    return StateManager;
  });
