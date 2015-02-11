module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  all: [
    '<%= config.app %>/scripts/{,*/}*.js',
    '!<%= config.app %>/bower_components/*',
    'test/spec/{,*/}*.js'
  ]
};
