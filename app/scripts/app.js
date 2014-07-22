define(['jquery', 'mustache', 'modules/DeckModule', 'modules/PlayerModule'], function ($, mustache, Deck, Player) {
  'use strict';

  return {
    init: function(){
      this.$deck = new Deck();
      this.$player1 = new Player('You', 'your');
      this.$player2 = new Player('Roboto', 'his');
      this.$player1HandVisible = true;
      this.$player2HandVisible = true;
      this.$cribOwner;
      this.$messages = ['Welcome Click the Deck to Play'];

      this.$autoContinueTimer = 2000;

      this.getTemplates();
      this.getElements();
      this.bindEvents();
      this.render();
    },
    getTemplates: function(){
      this.$visibleHandTemplate = $('#visibleHandTemplate').html();
      this.$hiddenHandTemplate = $('#hiddenHandTemplate').html();
      this.$cardTemplate = $('#cardTemplate').html();
      this.$cribTemplate = $('#cribTemplate').html();
      this.$messageTemplate = '{{#messages}}<li>{{.}}</li>{{/messages}}';
    },
    getElements: function(){
      this.$deckEl = $('#deck');

      this.$player1El = $('#player1');
      this.$player2El = $('#player2');
      this.$player1Hand = $('#bottomHand');
      this.$player2Hand = $('#topHand');
      this.$player1Crib = $('#player1 .crib');
      this.$player2Crib = $('#player2 .crib');

      this.$continueButton = $('.controls button');
      this.$messagesEl = $('#messageContainer');
    },
    unbindEvents: function(){
      this.$deckEl.off('click');
      this.$player1Hand.off('click', 'li');
    },
    bindEvents: function(){
      this.$deckEl.on('click', this.draw.bind(this));
      this.$player1Hand.on('click', 'li', this.selectCard.bind(this));
    },
    continueTimer: function(continueToFunction){
      this.unbindEvents();
      var self = this;
      setTimeout(function(){
        continueToFunction.call();
        self.bindEvents();
      }, this.$autoContinueTimer);
    },
    render: function(){
      this.$messagesEl.html(mustache.render(this.$messageTemplate, {messages: this.$messages}));
      this.$player1Hand.html(mustache.render(
        this.$player1HandVisible ? this.$visibleHandTemplate : this.$hiddenHandTemplate,
        {cards: this.$player1.hand}));
      this.$player2Hand.html(mustache.render(
        this.$player2HandVisible ? this.$visibleHandTemplate : this.$hiddenHandTemplate,
        {cards: this.$player2.hand, rotate: true}));
    },
    draw: function(){
      this.$deck.shuffle();
      this.$player1.hand = this.$deck.cut();
      this.$player2.hand = this.$deck.cut();
      this.$cribOwner = this.compareCards();
      //fix message
      this.$messages = [this.$cribOwner.name + ' won.'];
      this.render();
      this.continueTimer(this.deal.bind(this));
    },
    deal: function(){
      this.$player2HandVisible = false;
      this.$deck = new Deck();
      this.$deck.shuffle();
      var hands = this.$deck.deal();
      
      this.$player1.hand = hands.bottomHand;
      this.$player2.hand = hands.topHand;
      this.$messages = ['select two cards for ' + this.$cribOwner.possesive + ' crib'];
      this.rotateHands(true);
      this.render();
    },
    selectCard: function(event){
      var index = $(this.$player1Hand).find('li').index(event.currentTarget);
      var card = $(event.currentTarget).find('a');
      var selectedCards = this.$player1.cardsForCrib;
      function getOldCard(){
        return this.$player1Hand.find('li:eq('+ selectedCards[0]+') a');
      }

      function replaceOldCard(){
        $(getOldCard.call(this)).removeClass('selected');
        $(card).addClass('selected');
        selectedCards.splice(0, 1);
        selectedCards.push(index);
      }

      function removeCard(){
        $(card).removeClass('selected');
        selectedCards.splice(selectedCards.indexOf(index), 1);
      }

      function addNewCard(){
        selectedCards.push(index);
        $(card).addClass('selected');
      }

      function hasTwoCards(){
        return selectedCards.length > 1 && selectedCards.indexOf(index) == -1;
      }

      function isAlreadySelected(){
        return selectedCards.indexOf(index) !== -1;
      }
      if(hasTwoCards())
        replaceOldCard.apply(this);
      else if(isAlreadySelected())
        removeCard.apply(this);
      else addNewCard.apply(this);
    },
    rotateHands: function(isRotated){
      if(isRotated){
        this.$player1El.find('.playingCards').addClass('rotateHand');
        this.$player2El.find('.playingCards').addClass('rotateHand');
      } else {
        this.$player1El.find('.playingCards').removeClass('rotateHand');
        this.$player2El.find('.playingCards').removeClass('rotateHand');
      }
    },
    compareCards: function(){
      if(this.$player1.hand.value < this.$player2.hand.value){
        return this.$player2;
      } else if(this.$player1.hand.value > this.$player2.hand.value){
        return this.$player1;
      } else {
        this.$messages = ['it was a tie'];
        this.render();
        setTimeout(this.draw.bind(this), this.$autoContinueTimer);
      }
    }
  }
});