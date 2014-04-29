define([], function () {
    'use strict';
    function setName(value){
      switch(value){
        case 1:
          return 'A';
          break;
        case 11:
          return 'J';
          break;
        case 12:
          return 'Q';
          break;
        case 13:
          return 'K';
          break;
        default:
          return value.toString();
          break;
      }
    };
    return function(value, type){
      this.value = value;
      this.suit = type;
      this.name = setName(value);
    }
});