define(['modules/PubSub'],function(PubSub){
  'use strict';
  function BaseScoreKeeper(){
    this.mediator = PubSub;
  }

  return BaseScoreKeeper;
});
