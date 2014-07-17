define(['jquery', 'mustache', 'mediator', 'ui/ui.dialog'], function ($, Mustache, Mediator, uiDialog) {
  'use strict';

  Mediator.subscribe('ui.init.complete', function(){
    uiDialog.alert('Welcome to Cribbage, Click the Deck to start.');
    $('#deck').bind('click', function(){
      Mediator.publish('game.cut');
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
        setTimeout(function(){Mediator.publish('ui.cutCards.complete', hands);}, 2000);
      } else {
        uiDialog.alert('you won the cut!');
        setTimeout(function(){Mediator.publish('ui.cutCards.complete', hands);}, 2000);
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
        var selectedCards = [], selectedIndex;

        var rendered = Mustache.render(templateTop[0], {cards: hands.topHand});
        $('#player2').html(rendered);
        rendered = Mustache.render(templateBottom[0], {cards: hands.bottomHand});
        $('#player1').html(rendered);
        $('#player1 > .playingCards, #player2 > .playingCards').addClass('rotateHand');
        $('.controls').show();
        
        $('.controls button').bind('click', function(){
          uiDialog.clear();
          console.log(selectedCards);
        });

        $('#bottomHand li a').each(function(index, ele){
          $(ele).bind('click', function(){
            
            if(selectedCards.length > 1 && selectedCards.indexOf(index) == -1) {
              //remove first card add new
              $($('#bottomHand li a')[selectedCards[0]]).removeClass('selected');
              $(this).addClass('selected');
              selectedCards.splice(0, 1);
              selectedCards.push(index);
              
            } else if(selectedCards.indexOf(index) !== -1){
              //already selected
              $(this).removeClass('selected');
              selectedCards.splice(selectedCards.indexOf(index), 1);
            } else {
              //add
              selectedCards.push(index);
              $(this).addClass('selected');
            }
          });
        });

        Mediator.publish('ui.dealHands.done');
      });
    }
  }
});