define(
  ['modules/DeckModule', 'modules/PlayerModule', 'modules/PlayerAiModule', 'GameStates/DrawState',
   'GameStates/DealState', 'GameStates/CribState', 'GameStates/PrePlayState'],
  function(Deck, Player, PlayerAi, DrawState, DealState, CribState, PrePlayState){

  function Game(){
    this.$deck = new Deck();
    this.$player1 = new Player('You', 'your');
    this.$player2 = new PlayerAi('Roboto', 'his');
    this.$player1HandVisible = true;
    this.$player2HandVisible = true;
    this.$cribOwner;
    this.$messages = ['Welcome Click the Deck to Play'];
    this.$states = [new DrawState(this), new DealState(this), new CribState(this), new PrePlayState(this)]
    this.$state = this.$states[0];
  }

  Game.prototype.transitionTo = function (stateName) {
    this.$state = this.$states.filter(function(state){
      return state.name == stateName;
    })[0];
  };

  Game.prototype.compareCards = function() {
    if(this.$player1.hand.value < this.$player2.hand.value){
      return this.$player2;
    } else if(this.$player1.hand.value > this.$player2.hand.value){
      return this.$player1;
    } else {
      this.$messages = ['it was a tie'];
      return this.draw.bind(this);
    }
  };

  return Game;
});
