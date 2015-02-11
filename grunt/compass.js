module.exports = {
  options: {
    sassDir: '<%= config.app %>/styles',
    cssDir: '.tmp/styles',
    generatedImagesDir: '.tmp/images/generated',
    imagesDir: '<%= config.app %>/images',
    javascriptsDir: '<%= config.app %>/scripts',
    /*fontsDir: '<%= config.app %>/styles/fonts',*/
    importPath: '<%= config.app %>/bower_components',
    httpImagesPath: '/images',
    httpGeneratedImagesPath: '/images/generated',
    httpFontsPath: '/styles/fonts',
    relativeAssets: false
  },
  dist: {},
  server: {
    options: {
      debugInfo: false,
      noLineComments: false
    }
  }
};
