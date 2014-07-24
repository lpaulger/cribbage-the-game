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
    'mustache': '../bower_components/mustache/mustache',
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