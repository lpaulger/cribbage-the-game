define(['gameStates/BaseState'],function(BaseState){
  function PlayState(game){
    BaseState.call(this, game, 'Play');
    gm = this.game;
  }

  PlayState.prototype = Object.create(BaseState.prototype);
  PlayState.prototype.constructor = PlayState;

  PlayState.prototype.init = function(){
    gm.$showTopCard = true;
    
    setCurrentPlayer();

    if(gm.currentPlayer == gm.$player2) 
      processAiTurn.call(this);

    gm.$messages = [gm.$player1.possesive + ' turn'];
  };

  PlayState.prototype.deck = function(cardIndex) {

  };

  PlayState.prototype.selectCard = function(options) {
    gm.currentPlayer.playCard(options.index);
    processAiTurn.call(this);
  };

  PlayState.prototype.action = function() {

  };

  function setCurrentPlayer(){
    (gm.$cribOwner == gm.$player1) ?
      gm.currentPlayer = gm.$player2 :
      gm.currentPlayer = gm.$player1
  }

  function processAiTurn(){
    gm.currentPlayer = gm.$player2;
    gm.currentPlayer.playCard();
    gm.currentPlayer = gm.$player1;
  }


  return PlayState;
});
