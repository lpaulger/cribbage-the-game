define(['jquery'], function($){
  'use strict';
  return {
    init: function(player){
      $('#scoreControl .js-score-increase').on('click tap', function(){
        if(player.selectedScore < player.maxPoints){
          player.selectedScore++;
          $('#scoreControl input').val(player.selectedScore);
        }
      }.bind(this));

      $('#scoreControl .js-score-increase-x2').on('click tap', function(){
        if(player.selectedScore < player.maxPoints){

          player.selectedScore = player.selectedScore === (player.maxPoints-1) ? player.maxPoints: (player.selectedScore + 2);
          $('#scoreControl input').val(player.selectedScore);
        }
      }.bind(this));

      $('#scoreControl .js-score-decrease').on('click tap', function(){
        if(player.selectedScore > 0){
          player.selectedScore--;
          $('#scoreControl input').val(player.selectedScore);
        }
      }.bind(this));

      $('#scoreControl .js-score-clear').on('click tap', function(){
        player.selectedScore = 0;
        $('#scoreControl input').val(player.selectedScore);
      }.bind(this));

      $('#scoreControl input').on('input change', function(event){
        player.selectedScore = event.srcElement.valueAsNumber;
      }.bind(this));
    }
  };
});
