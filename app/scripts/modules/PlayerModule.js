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
      var isTwoForHisHeels = this.scoreKeeper.TwoForHisHeels(card, this);
      return {card: card, isTwoForHisHeels: isTwoForHisHeels};
    };

    Player.prototype.playCard = function(index) {
      var points = 0;
      var _tempHand = this.hand.slice();
      var card = _tempHand.splice(index, 1)[0];//selectCardFromHand

      if(this.playRules.isCardPlayable(this, card)){
        this.board.placeCard(card, this);
        this.points += points = this.scoreKeeper.evaluatePlay(this.board.playedCards, this.board.totalPlayedCardsForRound);
        if(this.board.currentBoardValue === 31){
          this.board.resetBoard();
        } else if(this.board.isEndOfRound()){
          this.board.totalPlayedCardsForRound = [];
          this.board.resetBoard();
        }
        this.hand.splice(index, 1);
        return points;
      } else if(!this.playRules.hasPlayableCards(this)){
        throw new Error('No Playable Cards');
      } else {
        throw new Error('Invalid Playable Card');
      }
    };

    Player.prototype.announceGo = function(){
      if(!this.playRules.hasPlayableCards(this)){
        var response = this.board.announceGo(this);
        if(response){
          this.points += response;
          return this.name + ' scored 1 point for GO';
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
