module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/images',
      src: '{,*/}*.{png,jpg,jpeg}',
      dest: '<%= config.dist %>/images'
    }]
  }
};
