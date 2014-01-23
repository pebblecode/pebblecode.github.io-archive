// grunt configuration
module.exports = function ( grunt ) {
  // use strick mode for JS
  'use strict';

  // grunt config options
  grunt.initConfig({
    // read package.json
    pkg: grunt.file.readJSON( 'package.json' ),

    // assemble (static site generator) options
    assemble: {
      // shared options
      options: {
        partials: [ 'src/shared/templates/partials/*.hbs' ],
        layout: [ 'src/shared/templates/layouts/default.hbs' ],
        postprocess: require( 'pretty' ),
        flatten: true
      },

      // generate pebble {code} pages
      codeSite: {
        options: {
          data: [ 'src/code/data/*.json' ]
        },
        files: {
          'dist/code/': [ 'src/shared/templates/pages/*.hbs' ]
        }
      },

      // generate pebble.it pages
      itSite: {
        options: {
          data: [ 'src/it/data/*.json' ]
        },
        files: {
          'dist/it/': [ 'src/shared/templates/pages/*.hbs' ]
        }
      }
    },

    // clean up old html
    clean: {
      all: [ 'dist/**/*.html' ]
    },

    // compile Sass
    sass: {
      dist: {
        options: {
          style: 'compressed',
          lineNumbers: true,
          sourcemap: true
        },
        files: {
          'dist/code/css/styles.css': 'src/shared/sass/code-styles.scss',
          'dist/it/css/styles.css': 'src/shared/sass/it-styles.scss'
        }
      }
    },

    // hint all JS files
    jshint:{
      data: {
        src: [ 'src/code/data/**/*.json', 'src/code/data/**/*.json' ]
      },
      js: {
        src: [ 'Gruntfile.js', 'src/shared/js/*.js', 'src/code/js/**/*.js', 'src/code/js/**/*.js', '!src/shared/js/*.min.js' ]
      }
    },

    uglify:{
      my_target: {
        files: {
          'src/shared/js/main.min.js': [ 'src/shared/js/main.js' ],
          'src/shared/js/tumblr.min.js': [ 'src/shared/js/tumblr.js' ]
        }
      }
    },

    // copy files to dist/
    copy: {
      // copy dev index
      devIndex: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      },
      // copy shared javascript
      sharedScripts: {
        files: [
          {
            expand: true,
            cwd: 'src/shared/js/',
            src: [ '**/*.min.js' ],
            dest: 'dist/code/js/'
          },
          {
            expand: true,
            cwd: 'src/shared/js/',
            src: [ '**/*.min.js' ],
            dest: 'dist/it/js/'
          }
        ]
      },
      // copy pebble {code} specific javascript
      codeScripts: {
        files: [{
          expand: true,
          cwd: 'src/code/js/',
          src: [ '**' ],
          dest: 'dist/code/js/'
        }]
      },
      // copy pebble.it specific javascript
      itScripts: {
        files: [{
          expand: true,
          cwd: 'src/it/js/',
          src: [ '**' ],
          dest: 'dist/it/js/'
        }]
      },
      // copy pebble {code} images
      codeImages: {
        files: [{
          expand: true,
          cwd: 'src/code/img/',
          src: [ '**' ],
          dest: 'dist/code/img/'
        }]
      },
      // copy pebble.it images
      itImages: {
        files: [{
          expand: true,
          cwd: 'src/it/img/',
          src: [ '**' ],
          dest: 'dist/it/img/'
        }]
      }
    },

    // spin up local dev server
    connect: {
      server: {
        options: {
          port: 7770,
          base: 'dist/',
          hostname: '0.0.0.0'
        }
      }
    },

    // open browser on start
    open: {
      dev: {
        path: 'http://localhost:7770'
      }
    },

    // watch for changes & complete tasks
    watch: {
      options: {
        livereload: true
      },
      // watch for changes to templates and data. Remove all html then rebuild
      html: {
        files: [ 'src/shared/templates/**/*.hbs', 'src/code/data/*.json', 'src/it/data/*.json' ],
        tasks: [ 'clean', 'assemble', 'copy:devIndex' ]
      },
      // watch for Sass changes. Complie to CSS
      css: {
        files: 'src/shared/sass/*.scss',
        tasks: [ 'sass' ]
      },
      // Watch for javascript changes. Run JShint & copy to dist
      js: {
        files: [ 'Gruntfile.js', 'src/shared/js/*.js', '!src/shared/js/*.min.js' ],
        tasks: [ 'jshint', 'uglify', 'copy:sharedScripts', 'copy:codeScripts', 'copy:itScripts' ]
      },
      // watch for changes to images. Copy to dist
      images: {
        files: [ 'src/code/img/**/*', 'src/it/img/**/*' ],
        tasks: [ 'copy:codeImages', 'copy:itImages' ]
      },
      // watch for changes to dev index. Copy to dist
      devIndex: {
        files: 'src/index.html',
        tasks: [ 'copy:devIndex' ]
      }
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },

      src: [ '*.html', 'js/**/*', 'css/**/*', 'img/**/*' ]
    }
  });

  grunt.loadNpmTasks( 'assemble' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-open' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-gh-pages' );
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask( 'default', [ 'connect', 'watch' ] );

  grunt.registerTask( 'make', [ 'clean', 'assemble', 'sass', 'copy:devIndex', 'copy:sharedScripts', 'copy:codeScripts', 'copy:itScripts', 'copy:codeImages', 'copy:itImages' ] );
};