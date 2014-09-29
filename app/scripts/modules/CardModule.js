define([], function () {
    'use strict';

    function Card(value, type){
      this.faceValue = value;
      this.value = setValue(value);
      this.suit = type;
      this.name = setName(value);
    }

    function setName(value){
      switch(value){
        case 1:
          return 'A';
        case 11:
          return 'J';
        case 12:
          return 'Q';
        case 13:
          return 'K';
        default:
          return value.toString();
      }
    }

    function setValue(value){
      if(value > 10) return 10;
      return value;
    }

    return Card;
});
