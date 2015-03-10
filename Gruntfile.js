/* jshint ignore:start */
'use strict';

var glob = require('glob');
var _ = require('lodash');

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt);
  grunt.registerMultiTask('template', 'simple grunt templating', function() {
    var _data = this.data;
    _data.files.forEach(function(pattern){
      grunt.log.debug('PATTERN:\n' + pattern);
      var output = glob.sync('./' + _data.src + '/' + pattern);
      grunt.log.debug('MATCHING FILES:\n' + output);
      output.forEach(function(filePath){
        var template = grunt.file.read(filePath, 'utf-8');
        var output = grunt.template.process(template, {data:_data.variables});
        filePath = filePath.replace(_data.src, _data.dest);
        grunt.file.write(filePath, output);
      });
    });
  });
};
