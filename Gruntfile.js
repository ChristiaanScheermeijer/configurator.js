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
          'src/asserts/assertError.js',
          'src/asserts/*.js',
          'src/node/node.js',
          'src/node/*.js',
          'src/core.js',
          'src/exports.js',
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
          helpers: 'test/helpers/*Helper.js'
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('default', ['build']);

};
