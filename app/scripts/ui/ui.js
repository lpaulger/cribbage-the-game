define(['jquery', 'mustache', 'mediator', 'ui/ui.dialog'], function ($, Mustache, Mediator, uiDialog) {
  'use strict';

  Mediator.subscribe('ui.init.complete', function(){
    $('#deck').bind('click', function(){
      if(uiDialog.confirm('Start Game?')){
        Mediator.publish('game.cut');
      };
    });
  });

  return {
    init: function(deck){
      $.ajax('templates/main.html').done(function(template){
        var rendered = Mustache.render(template, {cards: deck.cards});
        $('#content').html(rendered);

        Mediator.publish('ui.init.complete');
      });
    },
    cutCards: function(hands){
      $('#content').removeClass('rotateHand');
      $.ajax('templates/card.html').done(function(template){
        var rendered = Mustache.render(template, {card: hands.topHand}), selected = [];
        $('#player2').html(rendered);
      });
      $.ajax('templates/card.html').done(function(template){
        var rendered = Mustache.render(template, {card: hands.bottomHand}), selected = [];
        $('#player1').html(rendered);
      }).done(function(){
        Mediator.publish('ui.cutCards.complete');
      });
    },
    dealHands: function(hands){
      $('#content').addClass('rotateHand');
      $.ajax('templates/topHand.html').done(function(template){
        var rendered = Mustache.render(template, {cards: hands.topHand});
        $('#player2').html(rendered);

        $('#topHand li a').each(function(index, ele){
            $(ele).bind('click', function(){
              console.log(hands.topHand[index]);
            });
          });
      });

      $.ajax('templates/bottomHand.html').done(function(template){
        var rendered = Mustache.render(template, {cards: hands.bottomHand}), selected = [];
        $('#player1').html(rendered);
        $('#bottomHand li a').each(function(index, ele){
          $(ele).bind('click', function(){

            //if in array, remove
            // var existsId = selected.indexOf(ele);
            // if(existsId !== -1){
            //   selected.splice(existsId, 1);
            //   $(ele).removeClass('selected');
            // } else if(selected.length < 2){
            //   selected.push(ele);
            //   $(ele).addClass('selected');
            // } else {
            //   var removedCard = selected.splice(0, 1);
            //   $(removedCard).removeClass('selected');
            //   selected.push(ele);
            //   $(ele).addClass('selected');
            // }
            console.log(hands.bottomHand[index]);
          });
        });
      });
    }
  }
});