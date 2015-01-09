define(['modules/StorageModule'], function(Storage){
  'use strict';
  var _settings;

  function restoreSettingInformation(self){
    _settings.forEach(function(setting){
      setting.name = self._defaultSettings.filter(function(obj){
        return obj.id === setting.id;
      })[0].name;

      setting.description = self._defaultSettings.filter(function(obj){
        return obj.id === setting.id;
      })[0].description;
    });
  }

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
      description: 'Player scores their own points. Announcing \'Go\' will automatically score one (1) point',
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
      var self = this;
      _settings = Storage.loadSettings();
      if(!_settings)
        _settings = this._defaultSettings;

      restoreSettingInformation(self);

      return _settings;
    },
    save: function(settings){
      _settings = settings;

      _settings.forEach(function(setting){
        delete setting.name;
        delete setting.description;
      });

      Storage.saveSettings(settings);
    }
  };
});
