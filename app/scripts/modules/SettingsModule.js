define(['modules/StorageModule'], function(Storage){
  'use strict';
  var _settings;
  return {
    _defaultSettings: [{
      id:'action-confirmation',
      name:'Confirm Selection',
      description: 'an additional step to confirm the selected card',
      value: false
    },
    {
      id:'manual-count',
      name:'Count Manually',
      description: 'Player scores their own points',
      value: false
    }],
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
        _settings = this._defaultSettings;
      return _settings;
    },
    save: function(settings){
      _settings = settings;
      Storage.saveSettings(settings);
    }
  };
});
