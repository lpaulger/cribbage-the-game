module.exports = {
  debug: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.app %>',
      dest: '<%= config.dist %>',
      src: [
        '*.{ico,png,txt}',
        '.htaccess',
        'images/{,*/}*.{webp,gif}',
        'bower_components/Font-Awesome/fonts/*',
        'bower_components/{,*/}*.js',
        'scripts/{,*/}*.{js}'
      ]
    },{
      expand: true,
      cwd: '.tmp/styles/',
      src: '{,*/}*.css',
      dest: '<%= config.dist %>/styles/'
    }]
  },
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.app %>',
      dest: '<%= config.dist %>',
      src: [
        '*.{ico,png,txt}',
        '.htaccess',
        'images/{,*/}*.{webp,gif}',
        'bower_components/Font-Awesome/fonts/*',
        'Procfile',
        'server.js',
        'package.json'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: '<%= config.dist %>/images',
      src: [
        'generated/*'
      ]
    }]
  },
  cordova: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.dist %>',
      dest: '<%= config.cordova %>',
      src: [
        '*.html',
        'scripts/{,*/}*.*.js',
        'styles/{,*/}*.*.css',
        '*.{ico,png,txt}',
        'images/{,*/}*.{webp,gif}',
        'bower_components/Font-Awesome/fonts/*'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: '<%= config.cordova %>/images',
      src: [
        'generated/*'
      ]
    }]
  },
  'cordova-debug': {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.dist %>',
      dest: '<%= config.cordova %>',
      src: [
        '*.html',
        'scripts/{,*/}*.{js,html}',
        'styles/{,*/}*.css',
        '*.{ico,png,txt}',
        'images/{,*/}*.{webp,gif}',
        'bower_components/Font-Awesome/fonts/*',
        'bower_components/{,*/}*.js'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: '<%= config.cordova %>/images',
      src: [
        'generated/*'
      ]
    }]
  }
};
