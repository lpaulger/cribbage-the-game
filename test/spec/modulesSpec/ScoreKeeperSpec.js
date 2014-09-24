define(['modules/ScoreKeeperSingleton', 'modules/CardModule'], function(ScoreKeeper, Card) {
  'use strict';

  describe("ScoreKeeperModule", function () {
    var player, scoreKeeper;
    beforeEach(function(){
      player = {points: 0};
      scoreKeeper = ScoreKeeper.getInstance();
    });
    describe("Two For His Heels", function(){
      describe("And is a jack", function(){
        it("should award one point", function(){
          var card = new Card(11, 'hearts');

          var result = scoreKeeper.isTwoForHisHeels(card);
          expect(result).toEqual(true);
          expect(player.points).toEqual(0);
          scoreKeeper.TwoForHisHeels(card, player);
          expect(player.points).toEqual(2);
        });
      });
    });
    describe("The Play", function(){
      describe("count total 15", function(){
        it("should award the player 2 points", function(){
          var playCards = [new Card(10, 'hearts'), new Card(5, 'clubs')];

          expect(scoreKeeper.is15(playCards)).toEqual(true);

          expect(player.points).toEqual(0);
          scoreKeeper.evaluatePlay(playCards, player);
          expect(player.points).toEqual(2);
        });
      });
      describe("count total 31", function(){
        it("should award the player 2 points", function(){
          var playCards = [
            new Card(5, 'hearts'),
            new Card(5, 'diamonds'),
            new Card(5, 'clubs'),
            new Card(5, 'spades'),
            new Card(12, 'diamonds'),
            new Card(1, 'clubs')];

          expect(scoreKeeper.is31(playCards)).toEqual(true);

          expect(player.points).toEqual(0);
          scoreKeeper.evaluatePlay(playCards, player);
          expect(player.points).toEqual(2);
        });
      });

      describe("is a pair of two cards", function(){
        it("should award the player two points", function(){
          var playCards = [new Card(5, 'hearts'), new Card(5, 'clubs')];
          expect(scoreKeeper.hasAtLeastOnePair(playCards)).toEqual(true);

          expect(player.points).toEqual(0);
          scoreKeeper.evaluatePlay(playCards, player);
          expect(player.points).toEqual(2);
        });
      });

      describe("is a pair following a non matching card", function(){
        it("should only award 2 points", function(){
          var playCards = [new Card(6, 'hearts'), new Card(5, 'hearts'), new Card(5, 'clubs')];
          expect(scoreKeeper.hasAtLeastOnePair(playCards)).toEqual(true);

          expect(player.points).toEqual(0);
          scoreKeeper.evaluatePlay(playCards, player);
          expect(player.points).toEqual(2);
        });
      });

      describe("is 3 of a kind", function(){
        it("should award 6 points to the player", function(){
          var playCards = [new Card(5, 'diamonds'), new Card(5, 'hearts'), new Card(5, 'clubs')];
          expect(scoreKeeper.hasAtLeastOnePair(playCards)).toEqual(true);

          expect(player.points).toEqual(0);
          scoreKeeper.evaluatePlay(playCards, player);
          expect(player.points).toEqual(6);
        })
      });

      describe("is pair: 3, 4, 3, 3", function(){
        it("should award 2 points to the player", function(){
          var playCards = [new Card(3, 'diamonds'), new Card(4, 'hearts'), new Card(3, 'clubs'), new Card(3, 'hearts')];
          expect(scoreKeeper.hasAtLeastOnePair(playCards)).toEqual(true);

          expect(player.points).toEqual(0);
          scoreKeeper.evaluatePlay(playCards, player);
          expect(player.points).toEqual(2);
        })
      });

      describe("is first card, and not a pair", function(){
        var playCards;
        beforeEach(function(){
          playCards = [new Card(3, 'diamonds')];
        });

        it("should award 0 points", function(){
          scoreKeeper.evaluatePlay(playCards, player);
          expect(player.points).toEqual(0);
        });

        it("should not throw an error", function(){
          expect(function(){
            scoreKeeper.evaluatePlay(playCards);
          }).not.toThrow();
        });
      });

      describe("has a run of 1, 2, 3", function(){
        it("should award 3 points to the player", function(){
          var playCards = [new Card(1, 'diamonds'), new Card(2, 'hearts'), new Card(3, 'clubs')];
          expect(scoreKeeper.hasARun(playCards)).toEqual(true);

          expect(player.points).toEqual(0);
          scoreKeeper.evaluatePlay(playCards, player);
          expect(player.points).toEqual(3);
        });
      });

      describe("has a run of 1, 2, 3, 4", function(){
        it("should award 4 points to the player", function(){
          var playCards = [new Card(1, 'diamonds'), new Card(2, 'hearts'), new Card(3, 'clubs'), new Card(4, 'hearts')];
          expect(scoreKeeper.hasARun(playCards)).toEqual(true);

          expect(player.points).toEqual(0);
          scoreKeeper.evaluatePlay(playCards, player);
          expect(player.points).toEqual(4);
        });
      });

      describe("and there is no run", function(){
        it("should not award 3 points to the player", function(){
          var playCards = [new Card(3, 'diamonds'), new Card(2, 'hearts'), new Card(4, 'clubs')];
          expect(scoreKeeper.hasARun(playCards)).toEqual(false);

          expect(player.points).toEqual(0);
          scoreKeeper.evaluatePlay(playCards, player);
          expect(player.points).toEqual(0);
        });
      });

      describe("has a run of 3, 2, 1", function(){
        it("should award 3 points to the player", function(){
          var playCards = [new Card(3, 'diamonds'), new Card(2, 'hearts'), new Card(1, 'clubs')];
          expect(scoreKeeper.hasARun(playCards)).toEqual(true);

          expect(player.points).toEqual(0);
          scoreKeeper.evaluatePlay(playCards, player);
          expect(player.points).toEqual(3);
        });
      });
    });
  });
});