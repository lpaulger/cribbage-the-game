define(['modules/PlayRulesSingleton', 'modules/BoardSingleton', 'modules/PlayScoreKeeperSingleton'], function (PlayRules, Board, ScoreKeeper) {
    'use strict';

    var _board = Board.getInstance();

    function Player(name, possessive){
      this.name = name;
      this.possesive = possessive;
      this.hand = [];
      this.handInMemory = [];
      this.crib = [];
      this.cardsForCrib = [];
      this.points = 0;
      this.scoreKeeper = ScoreKeeper.getInstance();
      this.playRules = PlayRules.getInstance();
    }

    Player.prototype.placeCardsInCrib = function(cribOwner) {
      if (this.cardsForCrib.length === 2) {
        this.cardsForCrib.forEach(removeFromHand.bind(this));
        this.cardsForCrib = [];
      }

      function removeFromHand(card){
        unselectCurrentCard.call(this, card);
        cribOwner.crib.push(this.hand.splice(this.hand.indexOf(card), 1)[0]);
      }

      function unselectCurrentCard(card) {
        this.hand[this.hand.indexOf(card)].selected = '';
      }
    };

    Player.prototype.selectOneFromDeck = function(deck, cardIndex) {
      var card = deck.selectOne(cardIndex);
      this.scoreKeeper.TwoForHisHeels(card, this);
      return card;
    };

    Player.prototype.playCard = function(index) {
      var _tempHand = this.hand.slice();
      var card = _tempHand.splice(index, 1)[0];//selectCardFromHand
      if(this.playRules.isCardPlayable(this, card)){
        _board.placeCard(card, this);
        this.hand.splice(index, 1)[0];
      } else if(!this.hasPlayableCards()){
        gm.$messages = ['No Playable Cards, Press \'Go!\''];
        throw new Error('No Playable Cards')
      } else {
        gm.$messages = ['Try another card'];
        throw new Error('Invalid Playable Card')
      }
    };

    Player.prototype.hasPlayableCards = function () {
      return this.playRules.hasPlayableCards(this);
    };

    Player.prototype.announceGo = function(purpose){
      if(purpose == 'Count')
        _board.resetBoard();
      else if(!this.hasPlayableCards()){
        _board.announceGo(this);
        gm.$messages = [this.name + ' announces GO!'];
      } else {
        gm.$messages = [this.name + ' can\'t go, you have playable cards.'];
        throw new Error('Playable Cards');
      }
    };

    Player.prototype.restoreHand = function(){
      this.hand = this.handInMemory;
    };

    return Player;
});
