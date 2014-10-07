define(['jquery','gameStates/BaseState'],function($, BaseState){
  'use strict';

  function SummaryState(game){
    BaseState.call(this, game, 'Summary');
  }

  SummaryState.prototype = Object.create(BaseState.prototype);
  SummaryState.prototype.constructor = SummaryState;

  SummaryState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.page =  $('#summaryTemplate').html();
    return templates;
  };

  return SummaryState;
});