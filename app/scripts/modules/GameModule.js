define(['ui/ui', 'ui/ui.dialog', 'mediator'], function (ui, uiDialog, mediator) {
    'use strict';
    var deck, player1, player2;

    var state = {
      dealer: ''
    };

    //Events
    mediator.subscribe('game.cut', function(){
      deck.shuffle();
      player1.hand = deck.cut();
      player2.hand = deck.cut();
      mediator.publish('ui.cutCards', {topHand: player2.hand, bottomHand: player1.hand});
    });

    mediator.subscribe('ui.cutCards.complete', function(){
      if(player1.hand.value < player2.hand.value){
        state.dealer = player2;
      } else {
        state.dealer = player1;
      }
      mediator.publish('game.deal');
    });
    
    mediator.subscribe('game.deal', function(){
      deck.create();
      deck.shuffle();
      var hands = deck.deal();
      
      player1.hand = hands.bottomHand;
      player2.hand = hands.topHand;

      ui.dealHands(hands);
    });

    mediator.subscribe('ui.dealHands.done', function(){
      if(state.dealer == player1) uiDialog.alert('place 2 cards in your crib', false);
      else uiDialog.alert('select 2 cards for the opponents crib', false);
    });

    return function Game(options){
      deck = options.deck;
      player1 = options.player1;
      player2 = options.player2;

      deck.create();
    };
});