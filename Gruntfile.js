module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: "\n\n"
      },
      dist:    {
        src:  [
          'src/_intro.js',
          'src/utils/utils.js',
          'src/asserts/assertError.js',
          'src/asserts/*.js',
          'src/node/node.js',
          'src/node/*.js',
          'src/core/core.js',
          'src/core/exports.js',
          'src/_outro.js'
        ],
        dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name.replace(".js", "") %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist:    {
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jasmine: {
      dist: {
        src:     '<%= concat.dist.dest %>',
        options: {
          specs:   'test/specs/*Spec.js',
          helpers: 'test/helpers/*Helper.js',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'build/coverage/coverage.json',
            report: {
              type: 'lcovonly',
              options: {
                dir: 'build/coverage'
              }
            }
          }
        }
      }
    },

    jshint: {
      files:   ['dist/configurator.js'],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    watch: {
      files: ['src/**/*.js', 'test/**/*.js'],
      tasks: ['build', 'test']
    },

    coveralls: {
      dist: {
        src: 'build/coverage/lcov.info'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-coveralls');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('build', ['concat', 'uglify']);

  grunt.registerTask('travis', ['build', 'test', 'coveralls']);
  grunt.registerTask('default', ['build']);

};
