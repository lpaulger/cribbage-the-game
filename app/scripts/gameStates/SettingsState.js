define(['jquery', 'gameStates/BaseState', 'modules/DeckModule','modules/SettingsModule', 'text!templates/settings.html'],
  function($, BaseState, Deck, Settings, settingsHtml){
  'use strict';

  function SettingsState(game){
    BaseState.call(this, game, 'Settings');
  }

  SettingsState.prototype = Object.create(BaseState.prototype);
  SettingsState.prototype.constructor = SettingsState;

  SettingsState.prototype.init = function(){
    this.data = {
      settings: Settings.load()
    };
    this.render();
  };

  SettingsState.prototype.templates = function(){
    var templates = BaseState.prototype.templates();
    templates.page = settingsHtml;
    return templates;
  };

  SettingsState.prototype.bindEvents = function(){
    BaseState.prototype.bindEvents.call(this);
    $('a.back-link').on('click', function(){
      this.mediator.publish('transition', 'Home');
    }.bind(this));

    $('#settingsList li span.type-bool').on('click', function(event){
      var ele = event.currentTarget;
      var settingVal = ele.attributes['data-id'].value;

      var TrueSetting = this.data.settings.filter(function(setting){
        return setting.id === settingVal;
      })[0];

      TrueSetting.value = !TrueSetting.value;
      $(ele).children().toggleClass('fa-toggle-off').toggleClass('fa-toggle-on');

      Settings.save(this.data.settings);
    }.bind(this));

    $('#settingsList li input[type=radio]').on('change', function(event){
      var ele = event.currentTarget;
      var settingVal = ele.parentElement.parentElement.attributes['data-id'].value;

      var TrueSetting = this.data.settings.filter(function(setting){
        return setting.id === settingVal;
      })[0];

      TrueSetting.value = ele.value;
      Settings.save(this.data.settings);
    }.bind(this));
  };

  return SettingsState;
});
