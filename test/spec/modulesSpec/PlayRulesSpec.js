define(['modules/PlayRulesModule'], function(PlayRules) {
  'use strict';
  var _logic;
  describe('PlayRules', function () {
    describe('constructor', function(){
      it('should create an instance of PlayRules', function(){
        _logic = new PlayRules({board: {currentValue: 10}});
        expect(typeof _logic).toEqual('object');
      });
    });
  });
});
