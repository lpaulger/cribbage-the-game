module.exports = {
  main: {
    options: {
      baseUrl: '<%= config.app %>/scripts',
      mainConfigFile: "<%= config.app %>/scripts/require.config.js",
      name: '../bower_components/almond/almond',
      include: 'main',
      out: '<%= config.dist %>/scripts/main.js'
    }
  }
};
