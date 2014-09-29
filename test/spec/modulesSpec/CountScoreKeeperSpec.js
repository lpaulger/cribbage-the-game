define(['modules/CountScoreKeeperSingleton', 'modules/CardModule'], function(ScoreKeeper, Card) {
  'use strict';
  var scoreKeeper;
  describe("CountScoreKeeper", function () {
    beforeEach(function(){
      scoreKeeper = ScoreKeeper.getInstance();
    });
    describe('When 0 point hand', function(){
      it('should award 0 points', function(){
        var player = {points: 0};
        var starter = new Card(10, 'diamonds');
        var hand = [new Card(2, 'diamonds'), new Card(4, 'hearts'), new Card(6, 'clubs'), new Card(8, 'hearts')];

        scoreKeeper.evaluateHand(hand, starter, player);
        expect(player.points).toEqual(0);
      });
    });
    
    describe('getPairs', function(){
      describe('When one pair', function(){
        it('should award two points', function(){
          var player = {points: 0};
          var starter = new Card(10, 'diamonds');
          var hand = [new Card(2, 'diamonds'), new Card(2, 'hearts'), new Card(6, 'clubs'), new Card(8, 'hearts')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(2);
        });

        describe('and its from the starter', function(){
          it('should award two points', function(){
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
          var starter = new Card(10, 'clubs');
          var hand = [new Card(11, 'diamonds'), new Card(12, 'hearts'), new Card(8, 'clubs'), new Card(1, 'hearts')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(3);
        });
      });
    });

    describe("getHandFlush", function(){
      describe("if hand is all of the same suit but starter is different", function(){
        it("should award 4 points", function(){
          var player = {points: 0};
          var starter = new Card(10, 'diamonds');
          var hand = [new Card(2, 'hearts'), new Card(4, 'hearts'), new Card(6, 'hearts'), new Card(8, 'hearts')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(4);
        });
      });
      
      describe("if hand and starter are of the same suit", function(){
        it("should award 5 points", function(){
          var player = {points: 0};
          var starter = new Card(10, 'hearts');
          var hand = [new Card(2, 'hearts'), new Card(4, 'hearts'), new Card(6, 'hearts'), new Card(8, 'hearts')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(5);
        });
      });
    });
    
    describe("getNobs", function(){
      describe("and has matching Jack", function(){
        it("should award 1 point", function(){
          var player = {points: 0};
          var starter = new Card(10, 'diamonds');
          var hand = [new Card(11, 'diamonds'), new Card(4, 'hearts'), new Card(6, 'hearts'), new Card(8, 'hearts')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(1);
        });  
      });
      
      describe("and does not have matching Jack", function(){
        it("should not award any points", function(){
          var player = {points: 0};
          var starter = new Card(10, 'diamonds');
          var hand = [new Card(6, 'diamonds'), new Card(4, 'hearts'), new Card(12, 'hearts'), new Card(8, 'hearts')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(0);
        });
      });
    });
    
    describe("get15s", function(){
      describe("when one 15 match is present in hand", function(){
        it("should award 2 points", function(){
          var player = {points: 0};
          var starter = new Card(11, 'diamonds');
          var hand = [new Card(5, 'diamonds'), new Card(3, 'hearts'), new Card(8, 'clubs'), new Card(6, 'diamonds')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(2);
        });
      });
      
      describe("when a 15 is a combination of three cards", function(){
        it("should award 2 points", function(){
          var player = {points: 0};
          var starter = new Card(3, 'diamonds');
          var hand = [new Card(5, 'diamonds'), new Card(1, 'hearts'), new Card(8, 'clubs'), new Card(9, 'diamonds')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(2);
        });
      });
      
      describe("when multiple combinations of 15 exist (3)", function(){
        it("should rewad 6 points", function(){
          var player = {points: 0};
          var starter = new Card(10, 'diamonds');
          var hand = [new Card(5, 'diamonds'), new Card(1, 'hearts'), new Card(13, 'clubs'), new Card(9, 'diamonds')];

          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(6);
        });
      });
      
      describe("when 15 is made by using all 5 cards", function(){
        it("should award 2 points", function(){
          var player = {points: 0};
          var starter = new Card(5, 'diamonds');
          var hand = [new Card(3, 'diamonds'), new Card(2, 'hearts'), new Card(1, 'clubs'), new Card(4, 'diamonds')];

          //5 points from run, 2 from 15 (total of all cards)
          scoreKeeper.evaluateHand(hand, starter, player);
          expect(player.points).toEqual(7);
        });
      });
    });
  });
});