define(['modules/PlayScoreKeeper', 'modules/CardModule'], function(ScoreKeeper, Card) {
  'use strict';

  describe('ScoreKeeperModule', function () {
    var player, scoreKeeper, totalPlayedCards = [], points;
    beforeEach(function(){
      player = {points: 0};
      scoreKeeper = new ScoreKeeper();
    });

    describe('Two For His Heels', function(){
      describe('And is a jack', function(){
        it('should award one point', function(){
          var card = new Card(11, 'hearts');
          scoreKeeper.TwoForHisHeels(player, card);
          expect(player.points).toEqual(2);
        });
      });
    });

    describe('The Play', function(){
      describe('count total 15', function(){
        it('should award the player 2 points', function(){
          var playCards = [new Card(10, 'hearts'), new Card(5, 'clubs')];

          expect(scoreKeeper.is15(playCards)).toEqual(true);

          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(2);
        });
      });

      describe('count total 31', function(){
        it('should award the player 2 points', function(){
          var playCards = [
            new Card(5, 'hearts'),
            new Card(5, 'diamonds'),
            new Card(5, 'clubs'),
            new Card(5, 'spades'),
            new Card(12, 'diamonds'),
            new Card(1, 'clubs')
          ];

          expect(scoreKeeper.is31(playCards)).toEqual(true);

          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(2);
        });
      });

      describe('is a pair of two cards', function(){
        it('should award the player two points', function(){
          var playCards = [new Card(5, 'hearts'), new Card(5, 'clubs')];
          expect(scoreKeeper.hasAtLeastOnePair(playCards)).toEqual(true);

          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(2);
        });
      });

      describe('is a pair following a non matching card', function(){
        it('should only award 2 points', function(){
          var playCards = [new Card(6, 'hearts'), new Card(5, 'hearts'), new Card(5, 'clubs')];
          expect(scoreKeeper.hasAtLeastOnePair(playCards)).toEqual(true);

          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(2);
        });
      });

      describe('is 3 of a kind', function(){
        it('should award 6 points to the player', function(){
          var playCards = [new Card(4, 'diams'), new Card(4, 'clubs'), new Card(4, 'spades')];
          expect(scoreKeeper.hasAtLeastOnePair(playCards)).toEqual(true);

          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(6);
        });
      });

      describe('is pair: 3, 4, 3, 3', function(){
        it('should award 2 points to the player', function(){
          var playCards = [new Card(3, 'diamonds'), new Card(4, 'hearts'), new Card(3, 'clubs'), new Card(3, 'hearts')];
          expect(scoreKeeper.hasAtLeastOnePair(playCards)).toEqual(true);

          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(2);
        });
      });

      describe('is first card, and not a pair', function(){
        var playCards;
        beforeEach(function(){
          playCards = [new Card(3, 'diamonds')];
        });

        it('should award 0 points', function(){
          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(0);
        });

        it('should not throw an error', function(){
          expect(function(){
            points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          }).not.toThrow();
        });
      });

      describe('has a run of 1, 2, 3', function(){
        it('should award 3 points to the player', function(){
          var playCards = [new Card(1, 'diamonds'), new Card(2, 'hearts'), new Card(3, 'clubs')];
          expect(scoreKeeper.hasARun(playCards)).toEqual(true);

          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(3);
        });
      });

      describe('has a run of 1, 2, 3, 4', function(){
        it('should award 4 points to the player', function(){
          var playCards = [new Card(1, 'diamonds'), new Card(2, 'hearts'), new Card(3, 'clubs'), new Card(4, 'hearts')];
          expect(scoreKeeper.hasARun(playCards)).toEqual(true);

          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(4);
        });
      });

      describe('and there is no run', function(){
        it('should not award 3 points to the player', function(){
          var playCards = [new Card(3, 'diamonds'), new Card(2, 'hearts'), new Card(5, 'clubs')];
          expect(scoreKeeper.hasARun(playCards)).toEqual(false);

          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(0);
        });

        describe('even when cards are 5, 6, 5', function () {
          it('should not award 3 points to the player', function () {
            var playCards = [new Card(5, 'diamonds'), new Card(6, 'hearts'), new Card(5, 'clubs')];
            expect(scoreKeeper.hasARun(playCards)).toEqual(false);

            points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
            expect(points).toEqual(0);
          });
        });

        describe('out of order run of 5: 3, 5, 6, 7, 4', function () {
          it('should award 3 points for first three cards', function () {
            var playCards = [new Card(3, 'diamonds'), new Card(5, 'hearts'), new Card(6, 'clubs')];
            expect(scoreKeeper.hasARun(playCards)).toEqual(false);
            points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
            expect(points).toEqual(0);
          });

          it('should award no points for the 4th card', function () {
            var playCards = [new Card(3, 'diamonds'), new Card(5, 'hearts'), new Card(6, 'clubs'), new Card(7, 'hearts')];
            expect(scoreKeeper.hasARun(playCards)).toEqual(true);

            points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
            expect(points).toEqual(3);
          });

          it('should award 5 points for the 5th card', function () {
            var playCards = [new Card(3, 'diamonds'), new Card(5, 'hearts'), new Card(6, 'clubs'), new Card(7, 'hearts'), new Card(4, 'clubs')];
            expect(scoreKeeper.hasARun(playCards)).toEqual(true);

            points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
            expect(points).toEqual(5);
          });
        });
      });

      describe('check run when less than three cards', function () {
        it('should award 0 points to the player', function () {
          var playCards = [new Card(3, 'diamonds'), new Card(4, 'hearts')];
          expect(scoreKeeper.hasARun(playCards)).toEqual(false);
          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(0);
        });
      });

      describe('has a run of 3, 2, 1', function(){
        it('should award 3 points to the player', function(){
          var playCards = [new Card(3, 'diamonds'), new Card(2, 'hearts'), new Card(1, 'clubs')];
          expect(scoreKeeper.hasARun(playCards)).toEqual(true);

          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(3);
        });
      });

      describe('out of order run of 3: 4, 5, 3', function(){
        it('should award 3 points to the player', function () {
          var playCards = [new Card(4, 'diamonds'), new Card(5, 'hearts'), new Card(3, 'clubs')];
          expect(scoreKeeper.hasARun(playCards)).toEqual(true);

          points = scoreKeeper.evaluatePlay(player, playCards, totalPlayedCards);
          expect(points).toEqual(3);
        });
      });

      describe('player announces go', function(){
        describe('and other play has announces go', function(){
          it('should award player 1 point', function(){
            points = scoreKeeper.pointForGo(player);
            expect(points).toEqual(1);
          });
        });
      });

      describe('plays last card', function(){
        it('should award player with one point', function(){
          var playedCards = [
            new Card(3, 'diamonds'), new Card(2, 'hearts'),
            new Card(4, 'clubs'), new Card(2, 'diamonds')
          ];

          totalPlayedCards = [
            new Card(3, 'diamonds'), new Card(2, 'hearts'),
            new Card(4, 'clubs'), new Card(2, 'diamonds'),
            new Card(4, 'diamonds'), new Card(5, 'hearts'),
            new Card(11, 'clubs'), new Card(12, 'diamonds')
          ];

          points = scoreKeeper.evaluatePlay(player, playedCards, totalPlayedCards);
          expect(points).toEqual(1);
        });
      });
    });
  });
});