define(['jquery', 'mustache', 'mediator', 'ui/ui.dialog'], function ($, Mustache, Mediator, uiDialog) {
  'use strict';

  Mediator.subscribe('ui.init.complete', function(){
    $('#deck').bind('click', function(){
      if(uiDialog.confirm('Start Game?')){
        Mediator.publish('game.cut');
      };
    });
  });

   Mediator.subscribe('ui.cutCards', function(hands){
    $('#player1 > .playingCards, #player2 > .playingCards').removeClass('rotateHand');
    $.ajax('templates/card.html').then(function(template){
      var rendered = Mustache.render(template, {card: hands.topHand});
      $('#player2').html(rendered);

      rendered = Mustache.render(template, {card: hands.bottomHand});
      $('#player1').html(rendered);

      return hands;
    }).done(function(hands){
      if(hands.bottomHand.value == hands.topHand.value){
        uiDialog.alert('it\'s a tie! cut again');
        Mediator.publish('game.cut');
      } else if(hands.bottomHand.value < hands.topHand.value){
        uiDialog.alert('player2 won the cut :(');
        Mediator.publish('ui.cutCards.complete', hands);
      } else {
        uiDialog.alert('you won the cut!');
        Mediator.publish('ui.cutCards.complete', hands);
      }
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
      $('#player1 > .playingCards, #player2 > .playingCards').removeClass('rotateHand');
      $.ajax('templates/card.html').done(function(template){
        var rendered = Mustache.render(template, {card: hands.topHand});
        $('#player2').html(rendered);

        rendered = Mustache.render(template, {card: hands.bottomHand});
        $('#player1').html(rendered);
      }).done(function(){
        Mediator.publish('ui.cutCards.complete');
      });
    },
    dealHands: function(hands){
      $.when($.ajax('templates/topHand.html'), $.ajax('templates/bottomHand.html')).done(function(templateTop, templateBottom){
        var rendered = Mustache.render(templateTop[0], {cards: hands.topHand});
        $('#player2').html(rendered);
        rendered = Mustache.render(templateBottom[0], {cards: hands.bottomHand});
        $('#player1').html(rendered);
        $('#player1 > .playingCards, #player2 > .playingCards').addClass('rotateHand');

        $('#bottomHand li a').each(function(index, ele){
          $(ele).bind('click', function(){
            rendered = Mustache.render(template, {card: hands.topHand});
            $('#bottomHandCrib ul').html(rendered);
            Mediator.publish('ui.hand.select.card', index);
          });
        });

        Mediator.publish('ui.dealHands.done');
      });
    }
  }
});