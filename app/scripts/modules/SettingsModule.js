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

      if(setting.options){
        setting.options.filter(function(obj){
          delete obj.checked;
          return obj.value === setting.value;
        })[0].checked = 'checked';
      }
    });
  }

  return {
    _defaultSettings: [{
      id:'action-confirmation',
      name:'Confirm Selection',
      description: 'an additional step to confirm the selected card',
      type: 'bool',
      value: false
    },
    {
      id:'manual-count',
      name:'Count Manually',
      description: 'Player scores their own points. Announcing \'Go\' will automatically score one (1) point',
      type: 'bool',
      value: false
    },
    {
      id:'dominant-hand',
      name: 'Dominant Hand',
      description: 'The table layout will differ for right handed and left handed players',
      type: 'radio',
      value: 'right',
      options: [{value:'right'}, {value: 'left'}]
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
      var tempSettings = JSON.parse(JSON.stringify(_settings));

      tempSettings.forEach(function(setting){
        delete setting.name;
        delete setting.description;
      });

      Storage.saveSettings(tempSettings);
    }
  };
});
