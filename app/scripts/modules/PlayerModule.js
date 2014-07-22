define([], function () {
    'use strict';
    
    return function Player(name, possesive){
      this.name = name;
      this.possesive = possesive;
      this.hand = [];
      this.cardsForCrib = [];
    }
});