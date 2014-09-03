define(['gameStates/DrawState'], function(Draw){
  'use strict';
  var _draw;
  describe('Draw', function () {
    'use strict';
    it('should create Draw State', function () {
      _draw = new Draw();
      expect(typeof _draw).toBe('object');
    });

    describe('when deck is clicked', function () {
      it('should display a winner', function () {
        
      });
    });
  }); 
});