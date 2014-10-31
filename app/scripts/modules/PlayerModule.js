define(['scripts/modules/PlayRulesModule', 'scripts/modules/PlayScoreKeeper', 'scripts/modules/PubSub'], function (PlayRules, ScoreKeeper, PubSub) {
    'use strict';
    function Player(options){
      this.name = options.name; //required
      this.possessive = options.possessive; //required
      this.hand = options.hand || [];
      this.handInMemory = options.handInMemory || [];
      this.crib = options.crib || [];
      this.cardsForCrib = options.cardsForCrib || [];
      this.points = options.points || 0;
      this.board = options.board;//required
      this.playRules = new PlayRules({board: options.board});
      this.scoreKeeper = new ScoreKeeper();
      this.mediator = PubSub;
    }

    Player.prototype.placeCardsInCrib = function(cribOwner) {

      function removeFromHand(card){
        unselectCurrentCard.call(this, card);
        cribOwner.crib.push(this.hand.splice(this.hand.indexOf(card), 1)[0]);
      }

      function unselectCurrentCard(card) {
        this.hand[this.hand.indexOf(card)].selected = '';
      }

      if (this.cardsForCrib.length === 2) {
        this.cardsForCrib.forEach(removeFromHand.bind(this));
        this.cardsForCrib = [];
      }
    };

    Player.prototype.selectOneFromDeck = function(deck, cardIndex) {
      var card = deck.selectOne(cardIndex);
      this.scoreKeeper.TwoForHisHeels(this, card);
      return card;
    };

    Player.prototype.playCard = function(index) {
      var _tempHand = this.hand.slice();
      var card = _tempHand.splice(index, 1)[0];//selectCardFromHand

      if(this.playRules.isCardPlayable(this, card)){
        this.board.placeCard(card, this);
        this.scoreKeeper.evaluatePlay(this, this.board.playedCards, this.board.totalPlayedCardsForRound);
        if(this.board.currentBoardValue === 31){
          this.board.resetBoard();
        }
        this.hand.splice(index, 1);
      } else if(!this.playRules.hasPlayableCards(this)){
        throw new Error('No Playable Cards');
      } else {
        throw new Error('Invalid Playable Card');
      }
    };

    Player.prototype.announceGo = function(){
      if(!this.playRules.hasPlayableCards(this)){
        this.mediator.publish('messages-add', this.name + ' said GO');
        this.board.announceGo(this);
      } else {
        throw new Error('Playable Cards');
      }
    };

    Player.prototype.isWinner = function(){
      var isWinner = this.points >= 121;
      if(isWinner)
        this.mediator.publish('winner', this);
      return isWinner;
    };

    Player.prototype.restoreHand = function(){
      this.hand = this.handInMemory;
    };

    return Player;
  });
