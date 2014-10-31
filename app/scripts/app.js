define(['scripts/modules/Mediator'],
  function(Mediator){
    'use strict';

    function App(){
      this.mediator = new Mediator();
    }

    App.prototype.init = function(){
      this.mediator.publish('App:Start');
    };

    return App;
  });
