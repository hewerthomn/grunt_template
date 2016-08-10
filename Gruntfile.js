(function(undefined) {
  'use strict';

  module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
        options: {
          stripBanners: { block: true, line: true },
        },
        scripts: {
          nonull: true,
          dest: 'public/build/js/scripts.min.js',
          src: [
            'public/js/a.js',
            'public/js/b.js',
          ]
        }
      },

      uglify: {
        scripts: {
          options: { mangle: true },
          files: {
            'public/build/js/scripts.min.js': ['public/build/js/scripts.min.js']
          }
        }
      },

      copy: {
        map: {
          files: [
            { expand: true, flatten: true, src: ['public/lib/**/*.js.map'], dest: 'public/build/js' },
            { expand: true, flatten: true, src: ['public/lib/**/*.css.map'], dest: 'public/build/css' }
          ]
        },
        fonts: {
          files: [
            // { expand: true, cwd: 'public/lib/fonts', src: ['*', '**'], dest: 'build/css/fonts' },
            // { expand: true, flatten: true, src: ['lib/ionic/release/fonts/**.*'], dest: 'build/fonts' }
          ]
        }
      },

      concat_css: {
        options: {},
        styles: {
          dest: 'public/build/css/styles.min.css',
          src: [
            'public/css/a.css',
            'public/css/b.css'
          ]
        }
      },

      cssmin: {
        target: {
          files: {
            'public/build/css/styles.min.css': ['public/build/css/styles.min.css']
          }
        }
      },

      jshint: {
        all: ['Gruntfile.js', 'public/js/**/*.js']
      },

      watch: {
        html: {
          files: ['app/**/*.html'],
          options: {
            livereload: true
          }
        },

        min: {
          files: ['Gruntfile.js', 'public/app/**/*.js'],
          tasks: ['concat:scripts', 'jshint'],
          options: {
            atBegin: true,
            livereload: true
          }
        },

        css: {
          files: ['public/css/**/*.css'],
          tasks: ['concat_css'],
          options: {
            atBegin: true,
            livereload: true
          }
        }
      },

      notify_hooks: {
        options: {
          enabled: true,
          success: true,
          max_jshint_notifications: 5
        }
      }
    });

    grunt.loadNpmTasks('grunt-notify');
    grunt.task.run('notify_hooks');

    grunt.registerTask('dev', ['concat', 'concat_css']);
    grunt.registerTask('deploy', ['concat', 'concat_css', 'cssmin', 'copy', 'uglify']);
    grunt.registerTask('default', ['concat', 'concat_css', 'cssmin', 'copy']);

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);
  };

})();
