var UglifyJS = require('uglify-js');
var jade_inliner = require('simple-jadeify');

var PRETTY = !!0;

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jade: {
      release: {
        options: {
          pretty: PRETTY,
          data: {
          }
        },
        files: {
          'dist/index.html': 'src/jade/index.jade'
        }
      }
    },

    stylus: {
      compile: {
        options: {
          compress: !PRETTY
          // paths: ['path/to/import', 'another/to/import']
        },
        files: {
          'dist/style.css': 'src/styl/style.styl' // 1:1 compile
          // 'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.styl'] // compile and concat into single file
        }
      }
    },

    browserify2: {
      compile: {
        entry: './src/js/main.js',
        compile: './dist/app.js',
        beforeHook: function (bundle) {
          bundle.transform(jade_inliner);
        },
        afterHook: function (src) {
          if (PRETTY)
            return src;
          var result = UglifyJS.minify(src, { fromString: true });
          return result.code;
        }
      }
    },

    watch: {
      html: {
        files: 'src/jade/*.jade',
        tasks: 'jade'
      },
      css: {
        files: 'src/styl/*.styl',
        tasks: 'stylus'
      },
      js: {
        files: ['src/js/*.js', 'src/js/*.jade'],
        tasks: 'browserify2'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify2');

  grunt.registerTask('default', ['jade', 'stylus', 'browserify2']);
};
