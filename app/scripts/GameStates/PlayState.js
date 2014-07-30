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

    if(gm.currentPlayer == gm.$player2)
      processAiTurn.call(this);

    gm.$messages = [gm.$player1.possesive + ' turn'];
  };

  PlayState.prototype.deck = function(cardIndex) {

  };

  PlayState.prototype.selectCard = function(options) {
    try {
      gm.currentPlayer.playCard(options.index);
      gm.currentPlayer = gm.$player2;
    } catch(e) {
      throw e;
    }
    gm.transitionTo('Play', true);
  };

  PlayState.prototype.action = function() {
    gm.currentPlayer.announceGo();
  };

  function setCurrentPlayer(){
    if(!gm.currentPlayer){
      (gm.$cribOwner == gm.$player1) ?
        gm.currentPlayer = gm.$player2 :
        gm.currentPlayer = gm.$player1
    }
  }

  function processAiTurn(){
    var response = gm.currentPlayer.playCard();
    gm.currentPlayer = gm.$player1;
    setAction(response);
  }

  function setAction(response){
    gm.$messages = [response];
    if(!gm.$player1.hasPlayableCards())//player has no playable cards
      gm.$messages.push('Press \'Go!\''); gm.$actionText = 'Go!';
    //tableScore at 31
  }


  return PlayState;
});
