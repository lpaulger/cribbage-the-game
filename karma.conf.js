// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  'use strict';
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine-jquery', 'jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [
      {pattern:'app/bower_components/jquery/dist/jquery.js', included: false},
      {pattern:'app/bower_components/mustache/mustache.js', included: false},
      {pattern:'app/scripts/*.js', included: false},
      {pattern:'app/scripts/**/*.js', included: false},
      {pattern:'test/**/*Spec.js', included: false},
      {pattern:'test/**/*Mock.js', included: false},
      {pattern:'test/test-main.js', included: true},
      {pattern:'test/fixtures/*.html', included: true}
    ],

    // list of files / patterns to exclude
    exclude: ['app/scripts/main.js'],

    // coverage reporter generates the coverage
    reporters: ['dots', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app/scripts/**/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'test/coverage'
    },

    // web server port
    port: 9090,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
