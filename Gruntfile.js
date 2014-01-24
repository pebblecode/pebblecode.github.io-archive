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
      options: {
        partials: [ 'src/templates/partials/*.hbs' ],
        layout: [ 'src/templates/layouts/default.hbs' ],
        data: [ 'src/data/*.json' ],
        postprocess: require( 'pretty' ),
        flatten: true
      },

      pages: {
        src: [ 'src/templates/pages/*.hbs' ],
        dest: 'dist/'
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
          'dist/css/styles.css': 'src/sass/styles.scss'
        }
      }
    },

    // hint all JS files
    jshint:{
      data: {
        src: [ 'src/data/**/*.json', 'src/data/**/*.json' ]
      },
      js: {
        src: [ 'Gruntfile.js', 'src/js/*.js', '!src/js/*.min.js' ]
      }
    },

    uglify:{
      my_target: {
        files: {
          'src/js/main.min.js': [ 'src/js/main.js' ],
          'src/js/tumblr.min.js': [ 'src/js/tumblr.js' ]
        }
      }
    },

    // copy files to dist/
    copy: {
      // copy javascript
      scripts: {
        files: [
          {
            expand: true,
            cwd: 'src/js/',
            src: [ '**/*.min.js' ],
            dest: 'dist/js/'
          }
        ]
      },
      // copy images
      images: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: [ '**' ],
          dest: 'dist/img/'
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
        files: [ 'src/templates/**/*.hbs', 'src/data/*.json' ],
        tasks: [ 'clean', 'assemble' ]
      },
      // watch for Sass changes. Complie to CSS
      css: {
        files: 'src/sass/*.scss',
        tasks: [ 'sass' ]
      },
      // Watch for javascript changes. Run JShint & copy to dist
      js: {
        files: [ 'Gruntfile.js', 'srcjs/*.js', '!src/js/*.min.js' ],
        tasks: [ 'jshint', 'uglify', 'copy:scripts']
      },
      // watch for changes to images. Copy to dist
      images: {
        files: [ 'src/img/**/*' ],
        tasks: [ 'copy:images' ]
      },
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

  grunt.registerTask( 'make', [ 'clean', 'assemble', 'sass', 'copy:scripts', 'copy:images' ] );
};