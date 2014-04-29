/*global define */
define(['modules/DeckModule','modules/PlayerModule','modules/GameModule', 'ui/ui'], function (Deck, Player, Game, ui) {
    'use strict';

    var deck;

    deck = new Deck();

    return {
    	init: function(){
            //create players
            var player1 = new Player();
            var player2 = new Player();

            var game = new Game({
                player1: player1,
                player2: player2,
                deck: deck
            });

            //setup board
            ui.init(deck);
    	}
    }
});