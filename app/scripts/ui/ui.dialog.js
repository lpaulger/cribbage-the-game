define(['jquery', 'mustache', 'mediator'], function ($, Mustache, Mediator) {
  'use strict';

  return {
    confirm: function(message){
      return confirm(message);
    },
    alert: function(message){
      return alert(message);
    }
  }
});