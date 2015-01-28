define(['modules/StorageModule'], function(Storage){
  'use strict';
  var _settings;

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
      options: [{value:'right', checked: 'checked'}, {value: 'left'}]
    }],
    get: function(settingId){
      if(!_settings)
        this.load();
      return _settings.filter(function(obj){
        return obj.id === settingId;
      })[0].value;
    },
    load: function(){
      var savedSettings = Storage.loadSettings() || [];

      var tempSettings = JSON.parse(JSON.stringify(this._defaultSettings));

      tempSettings.forEach(function(setting){
        var savedSetting = savedSettings.filter(function(obj){
          return obj.id === setting.id;
        })[0];

        if(savedSetting)
          setting.value = savedSetting.value;

        if(savedSetting && savedSetting.options){
          savedSetting.options.filter(function(obj){
            delete obj.checked;
            return obj.value === savedSetting.value;
          })[0].checked = 'checked';

          setting.options = savedSetting.options;
        }

      });

      _settings = tempSettings;

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
