define(['modules/PlayRulesSingleton', 'modules/BoardSingleton', 'modules/PlayScoreKeeper', 'modules/Mediator'], function (PlayRules, Board, ScoreKeeper, Mediator) {
    'use strict';
    function Player(name, possessive){
      this.name = name;
      this.possessive = possessive;
      this.hand = [];
      this.handInMemory = [];
      this.crib = [];
      this.cardsForCrib = [];
      this.points = 0;
      this.scoreKeeper = new ScoreKeeper();
      this.playRules = PlayRules.getInstance();
      this.board = Board.getInstance();
      this.mediator = Mediator;
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
        } else if(this.board.isEndOfRound()){
          this.board.totalPlayedCardsForRound = [];
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
      return this.points >= 121;
    };

    Player.prototype.restoreHand = function(){
      this.hand = this.handInMemory;
    };

    return Player;
  });
