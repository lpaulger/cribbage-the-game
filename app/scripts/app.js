define(['jquery', 'mustache', 'modules/GameModule'], function ($, mustache, Game) {
  'use strict';

  return {
    init: function(){
      this.$autoContinueTimer = 2000;

      this.$game = new Game();
      this.$activeState = this.$game.$state;
      this.getTemplates();
      this.getElements();
      this.bindEvents();
      this.render();
    },
    getTemplates: function(){
      this.$visibleHandTemplate = $('#visibleHandTemplate').html();
      this.$hiddenHandTemplate = $('#hiddenHandTemplate').html();
      this.$cardTemplate = $('#cardTemplate').html();//NOT USED?
      this.$cribTemplate = $('#cribTemplate').html();
      this.$hiddenDeckTemplate = $('#hiddenDeckTemplate').html();
      this.$visibleDeckTemplate = $('#visibleDeckTemplate').html();
      this.$hiddenStraitDeckTemplate = $('#hiddenStraitDeckTemplate').html();
      this.$messageTemplate = '{{#messages}}<li>{{.}}</li>{{/messages}}';
      this.$controlsTemplate = $('#controlsTemplate').html();
    },
    getElements: function(){
      this.$deckEl = $('#deck');

      this.$player1El = $('#player1');
      this.$player2El = $('#player2');
      this.$player1Hand = $('#bottomHand');
      this.$player2Hand = $('#topHand');
      this.$player1Crib = $('#player1 .crib');
      this.$player2Crib = $('#player2 .crib');
      this.$controls = $('#controls');
      this.$messagesEl = $('#messageContainer');
    },
    unbindEvents: function(){
      this.$deckEl.off('click');
      this.$player1Hand.off('click', 'li');
      this.$controls.off('click', 'button');
    },
    bindEvents: function(){

      var _state = this.$game.$state;

      this.$deckEl.on('click', function(e){
          var cardIndex = $($(e.currentTarget).children("ul")[0]).children("li").children("a").index(e.target);
          $(e.target).addClass("selected");
          this.render(_state.deck(cardIndex));
      }.bind(this));

      this.$player1Hand.on('click', 'li', this.selectCard.bind(this));

      this.$controls.on('click', 'button', function(e){
        this.render(_state.action());
      }.bind(this));
    },
    getDeckTemplate: function(){
      if(this.$game.$state.name == 'PrePlay') return this.$hiddenStraitDeckTemplate;
      if(!this.$game.$showTopCard) return this.$hiddenDeckTemplate;
      if(this.$game.$showTopCard) return this.$visibleDeckTemplate;

      throw new Error('Undefined Deck Template');
    },
    render: function(nextAction){

      this.$messagesEl.html(mustache.render(this.$messageTemplate, {messages: this.$game.$messages}));

      this.$player1Hand.html(mustache.render(
        this.$game.$player1HandVisible ? this.$visibleHandTemplate : this.$hiddenHandTemplate,
        {cards: this.$game.$player1.hand}));

      this.$player1Crib.html(mustache.render(this.$cribTemplate, {cards: this.$game.$player1.crib}));

      this.$player2Hand.html(mustache.render(
        this.$game.$player2HandVisible ? this.$visibleHandTemplate : this.$hiddenHandTemplate,
        {cards: this.$game.$player2.hand}));

      this.$player2Crib.html(mustache.render(this.$cribTemplate, {cards: this.$game.$player2.crib}));

      this.$deckEl.html(mustache.render(
        this.getDeckTemplate(),
      {deck: this.$game.$deck, card: this.$game.topCard}));

      this.$controls.html(mustache.render(this.$controlsTemplate, {
        text: this.$game.$actionText, display: this.$game.$actionText ? 'block' : 'none'
      }));

      if(this.$activeState !== this.$game.$state){
        this.$activeState = this.$game.$state;

        if(this.$game.$await){
          this.unbindEvents();
          setTimeout(function(){
            this.bindEvents();
            this.render(this.$activeState.init());
          }.bind(this), this.$autoContinueTimer);
        } else {
          this.unbindEvents();
          this.bindEvents();
          this.render(this.$activeState.init());
        }
      };
    },
    selectCard: function(event){
      var index = $(this.$player1Hand).find('li').index(event.currentTarget);
      var card = $(event.currentTarget).find('a');
      this.render(this.$game.$state.selectCard({index: index, card: card, event:event}));
    }
  }
});
