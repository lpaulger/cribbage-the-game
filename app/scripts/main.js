require(['app'], function (App) {
  'use strict';
  if(typeof cordova !== 'undefined'){
    document.addEventListener('deviceready', function(){
    
      if(device.version.slice(0,2) === '2.')
        document.getElementsByTagName('body')[0].className += 'old-android';

      var app = new App();
      app.init();
    }, false);
  } else {
    var app = new App();
    app.init();
  }
});
