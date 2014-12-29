define(['modules/StorageModule'], function(Storage){
  'use strict';
  var _settings;
  var defaultSettings = [{
    id:'action-confirmation',
    name:'Action Confirmation',
    description: 'additional step to confirm card selection',
    value: false
  },
  {
    id:'manual-count',
    name:'Manual Point Counting',
    description: 'Player scores their own points',
    value: false
  }];

  return {
    get: function(settingId){
      if(!_settings)
        this.load();
      return _settings.filter(function(obj){
        return obj.id === settingId;
      })[0].value;
    },
    load: function(){
      _settings = Storage.loadSettings();
      if(!_settings)
        _settings = defaultSettings;
      return _settings;
    },
    save: function(settings){
      _settings = settings;
      Storage.saveSettings(settings);
    }
  };
});
