define(['modules/PlayLogic'], function(PlayLogic) {
  'use strict';
  var _logic, _player, _card;
  describe("PlayLogic", function () {
    describe("getInstance", function () {
      var _logicInstanceTwo;
      it("should always return the same instance", function () {
        _logic = PlayLogic.getInstance();
        _logicInstanceTwo = PlayLogic.getInstance();

        expect(_logic).toEqual(_logicInstanceTwo);
      });
    });
  });
});
