define(['jquery','gameStates/BaseState', 'text!templates/info.html'],function($, BaseState, infoHtml){
  'use strict';

  function HelpState(game){
    BaseState.call(this, game, 'Info');
  }

  HelpState.prototype = Object.create(BaseState.prototype);
  HelpState.prototype.constructor = HelpState;

  HelpState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.page =  infoHtml;
    return templates;
  };

  HelpState.prototype.bindEvents = function(){
    BaseState.prototype.bindEvents.call(this);
    $('a.back-link').on('click', function(){
      this.mediator.publish('transition', 'Back');
    }.bind(this));

    $(document).off('backbutton').on('backbutton', function(){
      this.mediator.publish('transition', 'Back');
    }.bind(this));
  };

  return HelpState;
});
