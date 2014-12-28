define(['modules/StorageModule'], function(Storage){
  'use strict';
  var defaultSettings = [{
    id:'auto-play-cards',
    name:'Auto Play Cards',
    description: 'During Play no confirmation of selected card required',
    value: false
  },
  {
    id:'manual-count',
    name:'Manual Point Counting',
    description: 'Player scores their own points',
    value: false
  }];

  return {
    load: function(){
      var settings = Storage.loadSettings();
      if(!settings)
        settings = defaultSettings;
      return settings;
    },
    save: function(settings){
      Storage.saveSettings(settings);
    }
  };
});
