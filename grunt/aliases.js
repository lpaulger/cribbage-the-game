module.exports = function (grunt, options) {
  // computation...
  return {
    'default': [
      'jshint',
      'test',
      'build'
    ],
    'build': [
      'clean:dist',
      'compass:server',
      'copy:debug'
    ],
    'build:dist': [
      'clean:dist',
      'useminPrepare',
      'concurrent:dist',
      'cssmin',
      'concat',
      'uglify',
      'copy:dist',
      'requirejs',
      'rev',
      'usemin'
    ],
    'build:cordova':['clean:cordova', 'build:dist', 'copy:cordova'],
    'build:cordova-debug':['clean:cordova', 'build', 'copy:cordova-debug'],
    'test':[
      'clean:server',
      'concurrent:test',
      'connect:test',
      'jshint',
      'karma',
      'coveralls'
    ],
    'test:dist': [
      'clean:server',
      'compass',
      'connect:test',
      'jshint',
      'karma',
      'coveralls'
    ],
    'serve': [
      'clean:server',
      'concurrent:server',
      'connect:livereload',
      'open:server',
      'watch'
    ],
    'serve:dist': ['build', 'open', 'connect:dist:keepalive']
  };
};
