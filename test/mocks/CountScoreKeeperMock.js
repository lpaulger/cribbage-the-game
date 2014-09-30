define([], function(){
  'use strict';
  var instance;

  function init() {
    return {
      get15s: function(){

      },
      getPairs: function(){

      },
      getRuns: function(){

      },
      getHandFlush: function(){

      },
      getNobs: function(){

      },
      evaluateHand: function(){

      }
    };
  }


  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    }
  };
});
