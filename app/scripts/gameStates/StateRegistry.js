/*jshint -W098 */
define(['gameStates/DrawState', 'gameStates/DealState', 'gameStates/CribState',
        'gameStates/PrePlayState', 'gameStates/PlayState', 'gameStates/CountState',
        'gameStates/SummaryState', 'gameStates/HomeState'],
  function (DrawState, DealState, CribState, PrePlayState, PlayState, CountState, SummaryState, HomeState) {
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
