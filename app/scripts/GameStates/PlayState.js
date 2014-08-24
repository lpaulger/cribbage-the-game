define(['gameStates/BaseState'],function(BaseState){
  function PlayState(game){
    BaseState.call(this, game, 'Play');
    gm = this.game;
  }

  PlayState.prototype = Object.create(BaseState.prototype);
  PlayState.prototype.constructor = PlayState;

  PlayState.prototype.init = function(){
    gm.$showTopCard = true;
    gm.$actionText = undefined;
    setCurrentPlayer();
    setAction();
    if(gm.currentPlayer == gm.$player2)
      processAiTurn.call(this);
  };

  PlayState.prototype.deck = function(cardIndex) {

  };

  PlayState.prototype.selectCard = function(options) {
    try {
      gm.currentPlayer.playCard(options.index);
      gm.currentPlayer = gm.$player2;
    } catch(e) {
      //card not played
      console.log(e);
    }
    gm.transitionTo('Play', true);
  };

  PlayState.prototype.action = function() {
    gm.$messages = [gm.currentPlayer.announceGo()];
    gm.transitionTo('Play', true);
  };

  function setCurrentPlayer(){
    if(!gm.currentPlayer){
      (gm.$cribOwner == gm.$player1) ?
        gm.currentPlayer = gm.$player2 :
        gm.currentPlayer = gm.$player1
    }
  }

  function processAiTurn(){
    gm.$messages = [gm.currentPlayer.playCard()];
    gm.currentPlayer = gm.$player1;
  }

  function setAction(){
    if(!gm.$player1.hasPlayableCards())
    {
      gm.$messages = ['Press \'Go!\''];
      gm.$actionText = 'Go!';
    }
  }


  return PlayState;
});
