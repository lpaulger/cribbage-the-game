define(
  ['modules/DeckModule', 'modules/PlayerModule', 'modules/PlayerAiModule', 'GameStates/DrawState'],
  function(Deck, Player, PlayerAi, DrawState){

  function Game(){
    this.$deck = new Deck();
    this.$player1 = new Player('You', 'your');
    this.$player2 = new PlayerAi('Roboto', 'his');
    this.$player1HandVisible = true;
    this.$player2HandVisible = true;
    this.$cribOwner;
    this.$messages = ['Welcome Click the Deck to Play'];

    this.$state = new DrawState(this);
  }

  Game.prototype.deal = function() {
    this.$player2HandVisible = false;
    this.$deck = new Deck();
    this.$deck.shuffle();
    var hands = this.$deck.deal();
    
    this.$player1.hand = hands.bottomHand;
    this.$player2.hand = hands.topHand;
    this.$messages = ['select two cards for ' + this.$cribOwner.possesive + ' crib'];
    this.$actionText = "Select";
    this.$action = this.crib;
  };

  Game.prototype.crib = function() {
    this.$player1.placeCardsInCrib(this.$cribOwner);
    this.$player2.placeCardsInCrib(this.$cribOwner);
    console.log(this.$cribOwner);
    console.log(this.$player1);
    console.log(this.$player2);
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

  Game.prototype.selectCard = function(options) {
    var selectedCards = this.$player1.cardsForCrib;

    function replaceOldCard(){
      this.$player1.hand[selectedCards[0]].selected = '';
      this.$player1.hand[options.index].selected = 'selected';
      selectedCards.splice(0, 1);
      selectedCards.push(this.$player1.hand[options.index]);
    }

    function removeCard(){
      this.$player1.hand[options.index].selected = '';
      selectedCards.splice(selectedCards.indexOf(options.index), 1);
    }

    function addNewCard(){
      selectedCards.push(this.$player1.hand[options.index]);
      this.$player1.hand[options.index].selected = 'selected';
    }

    function hasTwoCards(){
      return selectedCards.length > 1 && selectedCards.indexOf(options.index) == -1;
    }

    function isAlreadySelected(){
      return selectedCards.indexOf(options.index) !== -1;
    }
    if(hasTwoCards())
      replaceOldCard.apply(this);
    else if(isAlreadySelected())
      removeCard.apply(this);
    else addNewCard.apply(this);
  };

  return Game;
});