define(['gameStates/BaseState'],function(BaseState){
  function PlayState(game){
    BaseState.call(this, game, 'Play');
    gm = this.game;
    p1 = gm.$player1;
    p2 = gm.$player2;
  }
  var _toState = 'Play';
  PlayState.prototype = Object.create(BaseState.prototype);
  PlayState.prototype.constructor = PlayState;

  PlayState.prototype.init = function(){
    gm.$showTopCard = true;
    gm.$actionText = 'Go';
    setCurrentPlayer();
    setAction();
    if(gm.currentPlayer == p2)
      processAiTurn.call(this);
    else
      gm.$messages = ['Select a card to play'];

    if(isEndOfRound()){
      gm.$messages = ['Round Over.'];

    }
  };

  PlayState.prototype.deck = function(cardIndex) {

  };

  PlayState.prototype.selectCard = function(options) {
    try {
      p1.playCard(options.index);
      gm.currentPlayer = p2;
      gm.$messages = ['Their Turn'];
    } catch(e) {
      //card not played
      console.log(e);
    }
    gm.transitionTo('Play', true);
  };

  PlayState.prototype.action = function() {
    try {
      p1.announceGo();
      gm.currentPlayer = p2;
      gm.$messages = ['Their Turn'];
    } catch(e){
      console.log(e);
    }

    gm.transitionTo(_toState, true);
  };

  function setCurrentPlayer(){
    if(!gm.currentPlayer){
      (gm.$cribOwner == p1) ?
        gm.currentPlayer = p2 :
        gm.currentPlayer = p1
    }
  }

  function processAiTurn(){
    try{
      p2.playCard();
      gm.currentPlayer = p1;
    } catch(e){
      console.log(e);
    }
  }

  function setAction(){
    if(isEndOfRound()){
      gm.$messages = ['Round Over!'];
      gm.$actionText = 'Ok';
      _toState = 'Count';
    }
    else if(!p1.hasPlayableCards())
    {
      gm.$messages = ['Press \'Go!\''];
      gm.$actionText = 'Go!';
    }
  }

  function isEndOfRound(){
    return p1.hand.length == 0 && p2.hand.length == 0;
  }

  return PlayState;
});
