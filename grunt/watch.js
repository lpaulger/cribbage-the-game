module.exports = {
  css: {
    files: [
      '{.tmp,<%= config.app %>}/styles/{,*/}*.{scss, sass, css}',
      '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    tasks: ['compass:server'],
    options: {
      livereload: true
    }
  },
  js: {
    files: ['{.tmp,<%= config.app %>}/scripts/{,*/}*.js', '<%= config.test %>/spec/{,*/}*.js'],
    tasks: ['jshint'],
    options: {
      livereload: true
    }
  },
  html: {
    files: ['<%= config.app %>/*.html', '<%= config.app %>/scripts/templates/{,*/}*.html'],
    tasks: ['template:dev'],
    options: {
      livereload: true
    }
  }
};