module.exports = {
  options: {
    dirs: ['<%= config.dist %>']
  },
  html: ['<%= config.dist %>/{,*/}*.html'],
  css: ['<%= config.dist %>/styles/{,*/}*.css']
};
