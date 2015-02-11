module.exports = {
  files: ['<%= config.app %>/*.html',
    '{.tmp,<%= config.app %>}/styles/{,*/}*.{scss, sass, css}',
    '{.tmp,<%= config.app %>}/scripts/{,*/}*.js',
    '<%= config.app %>/scripts/templates/{,*/}*.html',
    '<%= config.test %>/spec/{,*/}*.js',
    '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'],
  tasks: ['jshint', 'compass:server'],
  options: {
    spawn: false,
    livereload: {
      port: '<%= config.LIVERELOAD_PORT %>'
    }
  }
};
