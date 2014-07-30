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
    describe("evaluateCard", function () {
      beforeEach(function () {
        _logic = PlayLogic.getInstance();
        _logic.resetRunningValue();
      });

      it("should add card value to running total", function () {
        _card = {value: 12}, _player = {hand: [_card]};

        expect(_logic.runningValue).toEqual(0);
        _logic.evaluateCard(_player, _card);
        expect(_logic.runningValue).toEqual(12);
      });

      describe("evaluatePoints", function () {
        afterEach(function(){
          _logic.resetRunningValue();
        })
        describe("and runningTotal == 15", function () {
          beforeEach(function () {
            _player = {score: 0, hand: [{value: 8}]};
            _logic.evaluateCard(_player, {value: 8});
          });
          it("should add two points to the players score", function () {
            expect(_player.score).toEqual(0);
            _logic.evaluateCard(_player, {value: 7});
            expect(_player.score).toEqual(2);
          });
        });
      });
      
      describe("hasPlayableCards", function(){
        describe("when user has a card within the playable range", function(){
          it("should return true", function(){
            _player = {score: 0, hand: [{value: 8}]};
            _logic.evaluateCard(_player, {value: 2});
            expect(_logic.hasPlayableCards(_player)).toEqual(true)
          });
        });

        describe("when user does not have a card within the playable range", function(){
          it("should return false", function(){
            _player = {score: 0, hand: [{value: 8}]};
            _logic.evaluateCard(_player, {value: 25});
            expect(_logic.hasPlayableCards(_player)).toEqual(false)
          });
        });
      });
    });
  });
});
