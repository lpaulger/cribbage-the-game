var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/app/scripts',

  // example of using shim, to load non AMD libraries (such as underscore and jquery)
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery',
    'mustache': '../bower_components/mustache/mustache'
  },
  map: {
    'modules/BoardSingleton': {
      'modules/ScoreKeeperSingleton': '../../test/mocks/ScoreKeeperMock'
    },
    'modules/PlayerModule': {
      'modules/ScoreKeeperSingleton': '../../test/mocks/ScoreKeeperMock'
    }
  },
  shim: {
    'jquery': {
      exports: '$'
    }
  },

  // dynamically load all test files
  deps: tests,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});

if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
              ? this
              : oThis,
            aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}