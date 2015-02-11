module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>',
      src: '*.html',
      dest: '<%= config.dist %>'
    }]
  }
};
