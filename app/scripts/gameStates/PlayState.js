define(['gameStates/BaseState'],function(BaseState){
  function PlayState(game){
    BaseState.call(this, game, 'Play');
    gm = this.game;
    p1 = this.game.$player1;
    p2 = this.game.$player2;
    this.nextState = 'Play';
  }

  PlayState.prototype = Object.create(BaseState.prototype);
  PlayState.prototype.constructor = PlayState;

  PlayState.prototype.init = function(){
    gm.$showTopCard = true;
    gm.$actionText = 'Go';
    setCurrentPlayer();
    if(gm.currentPlayer == p2)
      processAiTurn.call(this);
    else
      gm.$messages = ['Select a card to play'];

    setAction.call(this);
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
      console.log();
    }
    gm.transitionTo('Play', true);
  };

  PlayState.prototype.action = function() {
    try {
      p1.announceGo(this.nextState);
      gm.currentPlayer = p2;
      gm.$messages = ['Their Turn'];
    } catch(e){
      //console.log(e);
    }

    gm.transitionTo(this.nextState, true);

    if(isEndOfRound())
      this.nextState = 'Play';

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
      this.nextState = 'Count';
    }
    else if(!p1.hasPlayableCards())
    {
      gm.$actionText = 'Go!';
    }
  }

  function isEndOfRound(){
    return p1.hand.length == 0 && p2.hand.length == 0;
  }

  return PlayState;
});
