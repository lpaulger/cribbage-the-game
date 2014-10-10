define(['modules/Mediator'],function(Mediator){
  'use strict';
  function BaseScoreKeeper(){
    this.mediator = Mediator;
  }

  return BaseScoreKeeper;
});
