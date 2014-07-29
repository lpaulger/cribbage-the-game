define(['modules/ScoresSingleton'], function(Scores) {
  'use strict';
  var _scores, _player, _card;
  describe("ScoresSingleton", function () {
    describe("getInstance", function () {
      var _scoresInstanceTwo;
      it("should always return the same instance", function () {
        _scores = Scores.getInstance();
        _scoresInstanceTwo = Scores.getInstance();

        expect(_scores).toEqual(_scoresInstanceTwo);
      });
    });
    describe("evaluateCard", function () {
      beforeEach(function () {
        _scores = Scores.getInstance();
      });

      it("should add card value to running total", function () {
        _player = {}, _card = {value: 12};

        expect(_scores.runningValue).toEqual(0);
        _scores.evaluateCard(_player, _card);
        expect(_scores.runningValue).toEqual(12);
      });

      describe("evaluatePoints", function () {
        describe("and runningTotal == 15", function () {
          beforeEach(function () {
            _player = {}, _card = {value: 12};
            
          });
          it("should add two points to the players score", function () {

          });
        });
      });
      describe("exceeds31", function () {
        describe("and runningTotal + card.value exceeds 31", function () {
          it("should throw an error", function () {

          });
        });
      });
    });
  });
});
