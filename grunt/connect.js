'use strict';
var config = require('./config');
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var lrSnippet = require('connect-livereload')({
  port: config.LIVERELOAD_PORT
});

module.exports = {
  options: {
    port: 9000,
    // change this to '0.0.0.0' to access the server from outside
    hostname: 'localhost'
  },
  livereload: {
    options: {
      middleware: function(connect) {
        return [
          lrSnippet,
          mountFolder(connect, '.tmp'),
          mountFolder(connect, 'app')
        ];
      }
    }
  },
  test: {
    options: {
      middleware: function(connect) {
        return [
          mountFolder(connect, '.tmp'),
          mountFolder(connect, 'test')
        ];
      }
    }
  },
  dist: {
    options: {
      middleware: function(connect) {
        return [
          mountFolder(connect, 'dist')
        ];
      }
    }
  }
};
