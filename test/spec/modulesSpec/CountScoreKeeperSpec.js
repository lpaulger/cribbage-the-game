define(['modules/CountScoreKeeperSingleton', 'modules/CardModule'], function(ScoreKeeper, Card) {
  'use strict';
  var scoreKeeper;
  describe("CountScoreKeeper", function () {
    beforeEach(function(){
      scoreKeeper = ScoreKeeper.getInstance();
    });
    describe("When 0 point hand", function(){
      it("should award 0 points", function(){
        var player = {points: 0};
        var starter = new Card(10, 'diamonds');
        var hand = [new Card(2, 'diamonds'), new Card(4, 'hearts'), new Card(6, 'clubs'), new Card(8, 'hearts')];

        scoreKeeper.evaluateHand(hand, starter, player);
        expect(player.points).toEqual(0);
      });
    });
    
    describe("getPairs", function(){
      describe("When one pair", function(){
        it("should award two points", function(){
          var player = {points: 0};
          var starter = new Card(10, 'diamonds');
          var hand = [new Card(2, 'diamonds'), new Card(2, 'hearts'), new Card(6, 'clubs'), new Card(8, 'hearts')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(2);
        });

        describe("and its from the starter", function(){
          it("should award two points", function(){
            var player = {points: 0};
            var starter = new Card(2, 'diamonds');
            var hand = [new Card(2, 'diamonds'), new Card(10, 'hearts'), new Card(6, 'clubs'), new Card(8, 'hearts')];

            scoreKeeper.evaluateHand(hand, starter, player);
            expect(player.points).toEqual(2);
          });
        });

        describe("when two pairs", function(){
          it("should award four points", function(){
            var player = {points: 0};
            var starter = new Card(2, 'diamonds');
            var hand = [new Card(2, 'diamonds'), new Card(10, 'hearts'), new Card(8, 'clubs'), new Card(8, 'hearts')];

            scoreKeeper.evaluateHand(hand, starter, player);
            expect(player.points).toEqual(4);
          });
        });

        describe("when three of a kind", function(){
          it("should award 6 points (3 pairs)", function(){
            var player = {points: 0};
            var starter = new Card(2, 'diamonds');
            var hand = [new Card(2, 'diamonds'), new Card(10, 'hearts'), new Card(2, 'clubs'), new Card(8, 'hearts')];

            scoreKeeper.evaluateHand(hand, starter, player);
            expect(player.points).toEqual(6);
          });
        });
      });
    });
    
    describe("getRuns", function(){
      describe("single run of three", function(){
        it("should award three points", function(){
          var player = {points: 0};
          var starter = new Card(10, 'diamonds');
          var hand = [new Card(11, 'diamonds'), new Card(12, 'hearts'), new Card(8, 'clubs'), new Card(1, 'hearts')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(3);
        });
      });
    });

    ddescribe("getHandFlush", function(){
      describe("if hand is all of the same suit but starter is different", function(){
        it("should award 4 points", function(){
          var player = {points: 0};
          var starter = new Card(10, 'diamonds');
          var hand = [new Card(2, 'hearts'), new Card(4, 'hearts'), new Card(6, 'hearts'), new Card(8, 'hearts')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(4);
        });
      });
    });
    
    describe("getNobs", function(){

    });
  });
});