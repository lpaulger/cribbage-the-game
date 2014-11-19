// Generated on 2014-04-25 using generator-mobile 1.0.0-alpha.1
/* jshint ignore:start */
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var dirConfig = {
        app: 'app',
        dist: 'dist',
        test: 'test',
        cordova: 'www'
    };

    grunt.initConfig({
        config: dirConfig,
        // TODO: Make this conditional
        watch: {
          files: ['<%= config.app %>/*.html',
            '{.tmp,<%= config.app %>}/styles/{,*/}*.{scss, sass, css}',
            '{.tmp,<%= config.app %>}/scripts/{,*/}*.js',
            '<%= config.test %>/spec/{,*/}*.js',
            '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'],
          tasks: ['jshint', 'compass:server'],
          options: {
            spawn: false,
            livereload: {
              port: LIVERELOAD_PORT
            }
          }
        },

        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, dirConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, dirConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }

        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
          cordova: '<%= config.cordova %>/*',
            server: '.tmp'
        },
        browser_sync: {
            dev: {
                bsFiles: {
                    src: '<%= config.app %>/styles/style.css'
                },
                options: {
                    watchTask: false,
                    debugInfo: true,
                    // Change to 0.0.0.0 to access externally
                    host: 'http://localhost:<%= connect.options.port %>',
                    server: {
                        baseDir: '<%= config.app %>'
                    },
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    }
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/bower_components/*',
                'test/spec/{,*/}*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        coveralls: {
          options: {
            debug: true,
            coverage_dir: "test/coverage"
          }
        },
        compass: {
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
        },
        requirejs: {
          main: {
            options: {
              baseUrl: '<%= config.app %>',
              mainConfigFile: "<%= config.app %>/scripts/require.config.js",
              name: 'bower_components/almond/almond',
              include: 'scripts/main',
              out: '<%= config.dist %>/scripts/main.js'
            }
          }
        },
        rev: {
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
        },
        useminPrepare: {
            options: {
              dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },
        usemin: {
            options: {
                dirs: ['<%= config.dist %>']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= config.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= config.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/config/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: '*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
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
                        'bower_components/Font-Awesome/fonts/*'
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
            }
        },
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        bower: {
            options: {
                exclude: ['modernizr']
            },
            all: {
                rjsConfig: '<%= config.app %>/scripts/main.js'
            }
        },
        buildcontrol: {
          options: {
            dir: 'dist',
            commit: true,
            push: true,
            message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
          },
          pages: {
            options: {
              remote: 'https://' + process.env.GH_TOKEN + '@github.com/lpaulger/cribbage-the-game.git',
              branch: 'gh-pages'
            }
          }
        },
        githooks: {
          all: {
            // Will run the jshint and test:unit tasks at every commit
            'pre-commit': 'jshint'
          }
        }
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', function(target){
      //because travis-ci runs out of memory using concurrent
      if(target === 'dist'){
        return grunt.task.run([
          'clean:server',
          'compass',
          'connect:test',
          'jshint',
          'karma',
          'coveralls'
        ]);
      }
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'connect:test',
        'jshint',
        'karma',
        'coveralls'
      ]);
    });

    grunt.registerTask('build', function(target){
      if(target === 'cordova'){
        grunt.task.run(['clean:cordova','build:dist','copy:cordova']);
      } else {
        grunt.task.run([
          'clean:dist',
          'useminPrepare',
          'concurrent:dist',
          'cssmin',
          'concat',
          'uglify',
          'copy',
          'requirejs',
          'rev',
          'usemin'
        ]);
      }
    });

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

};
