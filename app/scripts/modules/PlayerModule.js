define(['modules/PlayRulesModule', 'modules/PlayScoreKeeper', 'modules/PubSub'], function(PlayRules, ScoreKeeper, PubSub){
  'use strict';
  function Player(options){
    this.name = options.name; //required
    this.possessive = options.possessive; //required
    this.hand = options.hand || [];
    this.handInMemory = options.handInMemory || [];
    this.crib = options.crib || [];
    this.currentPoints = options.currentPoints || 0;
    this.points = options.points || 0;
    this.board = options.board;//required
    this.playRules = new PlayRules({board:options.board});
    this.scoreKeeper = new ScoreKeeper();
    this.mediator = PubSub;
  }

  Player.prototype.getSelectedCards = function(){
    return this.hand.filter(function(card){
      return card.selected === 'selected';
    });
  };

  Player.prototype.placeCardsInCrib = function(cribOwner){

    function removeFromHand(card){
      unselectCurrentCard.call(this, card);
      cribOwner.crib.push(this.hand.splice(this.hand.indexOf(card), 1)[0]);
    }

    function unselectCurrentCard(card){
      delete this.hand[this.hand.indexOf(card)].selected;
    }

    if(this.getSelectedCards().length === 2){
      this.getSelectedCards().forEach(removeFromHand.bind(this));
    }
  };

  Player.prototype.selectOneFromDeck = function(deck, cardIndex){
    var card = deck.selectOne(cardIndex);
    this.scoreKeeper.TwoForHisHeels(this, card);
    return card;
  };

  Player.prototype.selectCard = function(index){
    var _tempHand = this.hand.slice();
    var card = _tempHand.splice(index, 1)[0];//selectCardFromHand


    var hand = this.hand;

    if(this.playRules.isCardPlayable(this, card)){
      if(HandHelper.isOneSelected(hand, index))
        HandHelper.replaceOldCard(hand, index);
      else HandHelper.selectCard(hand, index);
    } else if(!this.playRules.hasPlayableCards(this)){
      throw new Error('No Playable Cards');
    } else {
      throw new Error('Invalid Playable Card');
    }
  };

  Player.prototype.playCard = function(index){
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



  Player.prototype.selectCribCard = function(index){
    var hand = this.hand;

    if(HandHelper.isSelected(hand, index))
      HandHelper.unSelectCard(hand, index);
    else if(HandHelper.areTwoCardsSelected(hand, index))
      HandHelper.replaceOldCard(hand, index);
    else HandHelper.selectCard(hand, index);

    return this.getSelectedCards();
  };

  var HandHelper = {
    selectCard: function(hand, index){
      hand[index].selected = 'selected';
      return hand;
    },
    unSelectCard: function(hand, index){
      delete hand[index].selected;
      return hand;
    },
    isSelected: function(hand, index){
      return hand[index].selected !== undefined;
    },
    isOneSelected: function(hand, index){
      var selectedCards = hand.filter(function(card){
        return card.selected === 'selected';
      });

      return selectedCards.length >= 1 && selectedCards.indexOf(index) === -1;
    },
    areTwoCardsSelected: function(hand, index){
      var selectedCards = hand.filter(function(card){
        return card.selected === 'selected';
      });

      return selectedCards.length > 1 && selectedCards.indexOf(index) === -1;
    },
    replaceOldCard: function(hand, index){
      var oldCard = hand.filter(function(card){
              return card.selected === 'selected';
            })[0];

      this.unSelectCard(hand, hand.indexOf(oldCard));
      return this.selectCard(hand, index);
    }
  };



  return Player;
});
