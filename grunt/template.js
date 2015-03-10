'use strict';
module.exports = {
  dev: {
    src: '<%= config.app %>',
    dest: '<%= config.tmp %>',
    files: ['index.html'],
    variables: {
      analyticsId: 'UA-XXXXXXXX-X',
      version: '<%= package.version %>'
    }
  },
  dist: {
    src: '<%= config.app %>',
    dest: '<%= config.dist %>',
    files: ['/index.html'],
    variables: {
      analyticsId: '<%= config.analyticsId %>',
      version: '<%= package.version %>'
    }
  }
};