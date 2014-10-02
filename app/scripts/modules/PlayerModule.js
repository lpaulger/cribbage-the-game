define(['modules/PlayRulesSingleton', 'modules/BoardSingleton', 'modules/PlayScoreKeeper'], function (PlayRules, Board, ScoreKeeper) {
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
      this.scoreKeeper.TwoForHisHeels(card, this);
      return card;
    };

    Player.prototype.playCard = function(index) {
      var points = 0;
      var _tempHand = this.hand.slice();
      var card = _tempHand.splice(index, 1)[0];//selectCardFromHand
      if(this.playRules.isCardPlayable(this, card)){
        this.board.placeCard(card, this);
        this.points += points = this.scoreKeeper.evaluatePlay(this.board.playedCards, this.board.totalPlayedCardsForRound);
        this.hand.splice(index, 1);
        return points;
      } else if(!this.hasPlayableCards()){
        throw new Error('No Playable Cards');
      } else {
        throw new Error('Invalid Playable Card');
      }
    };

    Player.prototype.hasPlayableCards = function () {
      return this.playRules.hasPlayableCards(this);
    };

    Player.prototype.announceGo = function(purpose){
      if(purpose === 'Count')
        this.board.resetBoard();
      else if(!this.hasPlayableCards()){
        var response = this.board.announceGo(this);
        if(response){
          this.points += response;
          return this.name + ',' + response + ' point for GO';
        }
        return this.name + ' said GO';
      } else {
        throw new Error('Playable Cards');
      }
    };

    Player.prototype.restoreHand = function(){
      this.hand = this.handInMemory;
    };

    return Player;
  });
