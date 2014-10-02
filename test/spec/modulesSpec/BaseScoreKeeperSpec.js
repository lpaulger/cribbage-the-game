define(['modules/BaseScoreKeeper'], function(ScoreKeeper){
  'use strict';


  describe('BaseScoreKeeper', function(){
    var scoreKeeper, player;
    describe('Constructor', function(){
      it('should create BaseScoreKeeper', function(){
        scoreKeeper = new ScoreKeeper();
        expect(scoreKeeper).toBeDefined();
      });
    });

    describe('isWinner', function(){
      beforeEach(function(){
        scoreKeeper = new ScoreKeeper();
      });

      describe('when the player has not accumulated 121 points', function(){
        it('should return false', function(){
          player = {
            points: 100
          };
          var result = scoreKeeper.isWinner(player);
          expect(result).toBe(false);
        });
      });

      describe('when the player has 121 points', function(){
        it('should return true', function(){
          player = {
            points: 121
          };
          var result = scoreKeeper.isWinner(player);
          expect(result).toBe(true);
        });
      });
    });
  });
});