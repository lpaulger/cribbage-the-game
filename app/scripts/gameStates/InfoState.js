define(['jquery','scripts/gameStates/BaseState'],function($, BaseState){
  'use strict';

  function HelpState(game){
    BaseState.call(this, game, 'Info');
  }

  HelpState.prototype = Object.create(BaseState.prototype);
  HelpState.prototype.constructor = HelpState;

  HelpState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.page =  $('#infoTemplate').html();
    return templates;
  };

  return HelpState;
});
