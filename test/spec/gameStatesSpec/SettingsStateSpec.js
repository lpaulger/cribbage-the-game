define(['gameStates/SettingsState','modules/SettingsModule'], function(SettingsState, Settings){
  'use strict';

  describe('SettingsState', function(){
    var settingsState;
    describe('Constructor', function(){
      it('should define the settings state', function(){
        settingsState = new SettingsState();
        expect(SettingsState).toBeDefined();
      });
    });

    describe('init', function(){
      beforeEach(function(){
        settingsState = new SettingsState();
        spyOn(Settings, 'load');
      });

      it('should load the settings', function(){
        settingsState.init();
        expect(Settings.load.calls.count()).toEqual(1);
      });
    });
  });
});
