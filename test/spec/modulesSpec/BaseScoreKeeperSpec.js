define(['modules/BaseScoreKeeper'], function(ScoreKeeper){
  'use strict';


  describe('BaseScoreKeeper', function(){
    var scoreKeeper;
    describe('Constructor', function(){
      it('should create BaseScoreKeeper', function(){
        scoreKeeper = new ScoreKeeper();
        expect(scoreKeeper).toBeDefined();
      });
    });
  });
});