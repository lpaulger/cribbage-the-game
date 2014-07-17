define(['jquery', 'mustache', 'mediator'], function ($, Mustache, Mediator) {
  'use strict';

  return {
    confirm: function(message){
      return confirm(message);
    },
    alert: function(message, isAutoDismissed){
      isAutoDismissed = isAutoDismissed == undefined ? true : false;
      var elementReference;
      $.ajax('templates/message.html').then(function(template){
        var rendered = Mustache.render(template, {message: message});
        if(isAutoDismissed){
          setTimeout(function(){
            $(elementReference).remove();
          }, 5000);
        }
        elementReference = $(rendered);
        $('#messageContainer').append(elementReference);
      });
    },
    clear: function(){
      $('#messageContainer').html('');
    }
  }
});