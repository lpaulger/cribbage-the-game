define(['modules/PlayRulesSingleton'], function(PlayRules) {
  'use strict';
  var _logic, _player, _card;
  describe("PlayRules", function () {
    describe("getInstance", function () {
      var _logicInstanceTwo;
      it("should always return the same instance", function () {
        _logic = PlayRules.getInstance();
        _logicInstanceTwo = PlayRules.getInstance();

        expect(_logic).toEqual(_logicInstanceTwo);
      });
    });
  });
});
