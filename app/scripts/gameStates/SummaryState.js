define(['jquery','gameStates/BaseState', 'text!templates/summary.html'],function($, BaseState, summaryHtml){
  'use strict';

  function SummaryState(game){
    BaseState.call(this, game, 'Summary');
  }

  SummaryState.prototype = Object.create(BaseState.prototype);
  SummaryState.prototype.constructor = SummaryState;

  SummaryState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.page =  summaryHtml;
    return templates;
  };

  SummaryState.prototype.bindEvents = function(){
    $('#newGameButton').on('click', function(){
      this.mediator.publish('start');
    }.bind(this));

    $('#homeButton').on('click', function(){
      this.mediator.publish('transition', 'Home');
    }.bind(this));
  };

  return SummaryState;
});
