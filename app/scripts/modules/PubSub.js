define([], function(){
  'use strict';

  var channels = {};
  var subscribe = function(channel, fn){
      if (!channels[channel]) channels[channel] = [];
      channels[channel].push({ context: this, callback: fn });
      return this;
    },

    unsubscribe = function(channel, fn){
      if( !channels.hasOwnProperty( channel ) ) {
        return false;
      }

      for( var i = 0, len = channels[ channel ].length; i < len; i++ ) {

        if( channels[ channel ][ i ].callback === fn ) {
          channels[ channel ].splice( i, 1 );
          return true;
        }
      }

      return false;
    },

    publish = function(channel){
      if (!channels[channel] || channels[channel].length === 0) return false;
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0, l = channels[channel].length; i < l; i++) {
        var subscription = channels[channel][i];
        subscription.callback.apply(subscription.context, args);
      }
      return this;
    };

  return {
    channels: channels,
    publish: publish,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    installTo: function(obj){
      obj.subscribe = subscribe;
      obj.publish = publish;
    }
  };
});