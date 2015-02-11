module.exports = {
  dist: {
    files: {
      src: [
        '<%= config.dist %>/scripts/{,*/}*.js',
        '<%= config.dist %>/styles/{,*/}*.css',
        '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
        '<%= config.dist %>/styles/fonts/*'
      ]
    }
  }
};
