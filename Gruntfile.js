var path;

path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      working: {
        src: ['./dist/', './dist_test/', './.temp/']
      }
    },
    copy: {
      dev: {
        files: [
          {
            cwd: './.temp/',
            src: '**',
            dest: './dist/',
            expand: true
          }
        ]
      },
      img: {
        files: [
          {
            cwd: './src/',
            src: ['img/**/*.png', 'img/**/*.ico'],
            dest: './.temp/',
            expand: true
          }
        ]
      },
      css: {
        files: [
          {
            cwd: './src/',
            src: 'css/**/*.css',
            dest: './.temp/',
            expand: true
          }
        ]
      },
      js: {
        files: [
          {
            cwd: './src/',
            src: 'scripts/**/*.js',
            dest: './.temp/',
            expand: true
          }, {
            cwd: './src/',
            src: 'scripts/**/*.js',
            dest: './dist_test/',
            expand: true
          }
        ]
      },
      prod: {
        files: [
          {
            cwd: './.temp/',
            src: ['img/**/*.png', 'img/**/*.ico', 'css/**/*.css', 'scripts/libs/html5shiv-printshiv.js', 'scripts/libs/json2.js', 'scripts/scripts.min.js', 'scripts/scripts.min.js.map', 'scripts/scripts.min.js.src', 'styles/styles.min.css'],
            dest: './dist/',
            expand: true
          }, {
            './dist/index.html': './.temp/index.min.html'
          }
        ]
      },
      index: {
        files: [
          {
            cwd: './.temp/',
            src: 'index.html',
            dest: './dist/',
            expand: true
          }
        ]
      },
      scripts: {
        files: [
          {
            cwd: './.temp/',
            src: 'scripts/**',
            dest: './dist/',
            expand: true
          }
        ]
      },
      styles: {
        files: [
          {
            cwd: './.temp/',
            src: 'styles/**',
            dest: './dist/',
            expand: true
          }
        ]
      },
      views: {
        files: [
          {
            cwd: './.temp/',
            src: 'views/**',
            dest: './dist/',
            expand: true
          }
        ]
      }
    },
    express: {
      livereload: {
        options: {
          port: 3005,
          bases: path.resolve('./dist'),
          debug: true,
          monitor: {},
          server: path.resolve('./server')
        }
      }
    },
    imagemin: {
      img: {
        files: [
          {
            cwd: './src/',
            src: ['img/**/*.png', 'img/**/*.ico'],
            dest: './.temp/',
            expand: true
          }
        ],
        options: {
          optimizationLevel: 7
        }
      }
    },
    less: {
      styles: {
        files: {
          './.temp/styles/styles.css': './src/styles/styles.less'
        }
      }
    },
    minifyHtml: {
      prod: {
        files: {
          './.temp/index.min.html': './.temp/index.html'
        }
      }
    },
    ngTemplateCache: {
      views: {
        files: {
          './.temp/scripts/views.js': './.temp/views/**/*.html'
        },
        options: {
          trim: './.temp'
        }
      }
    },
    regarde: {
      dist: {
        files: './dist/**',
        tasks: 'livereload'
      },
      server: {
        files: ['server.js', 'routes.js'],
        tasks: 'express-restart:livereload'
      }
    },
    requirejs: {
      scripts: {
        options: {
          baseUrl: './.temp/scripts/',
          findNestedDependencies: true,
          logLevel: 0,
          mainConfigFile: './.temp/scripts/main.js',
          name: 'main',
          onBuildWrite: function(moduleName, path, contents) {
            var modulesToExclude, shouldExcludeModule;
            modulesToExclude = ['main'];
            shouldExcludeModule = modulesToExclude.indexOf(moduleName) >= 0;
            if (shouldExcludeModule) {
              return '';
            }
            return contents;
          },
          optimize: 'uglify2',
          out: './.temp/scripts/scripts.min.js',
          preserveLicenseComments: false,
          generateSourceMaps: true,
          skipModuleInsertion: true,
          uglify: {
            no_mangle: false
          }
        }
      },
      styles: {
        options: {
          baseUrl: './.temp/styles/',
          cssIn: './.temp/styles/styles.css',
          logLevel: 0,
          optimizeCss: 'standard',
          out: './.temp/styles/styles.min.css'
        }
      }
    },
    template: {
      views: {
        files: {
          './.temp/views/': './src/views/**/*.template'
        }
      },
      dev: {
        files: {
          './.temp/index.html': './src/index.template'
        },
        environment: 'dev'
      },
      prod: {
        files: '<%= template.dev.files %>',
        environment: 'prod'
      }
    },
    env: {
      karma: {
        PHANTOMJS_BIN: './node_modules/.bin/phantomjs'
      }
    },
    karma: {
      options: {
        autoWatch: true,
        colors: true,
        configFile: './karma.conf.js',
        keepalive: true,
        port: 8081,
        reporters: ['progress']
      },
      server: {},
      unit: {
        options: {
          browsers: ['PhantomJS'],
          singleRun: true
        }
      }
    },
    watch: {
      index: {
        files: './src/index.template',
        tasks: ['template:dev', 'copy:index']
      },
      scripts: {
        files: './src/scripts/**',
        tasks: ['copy:js', 'copy:scripts']
      },
      styles: {
        files: './src/styles/**/*.less',
        tasks: ['less', 'copy:styles']
      },
      views: {
        files: './src/views/**/*.template',
        tasks: ['template:views', 'copy:views']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-hustler');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('test', ['default', 'env:karma', 'karma:unit']);
  grunt.registerTask('karma:run', ['karma:server:run']);
  grunt.registerTask('server', ['livereload-start', 'express', 'regarde']);
  grunt.registerTask('default', ['clean:working', 'copy:js', 'less', 'template:views', 'copy:img', 'copy:css', 'template:dev', 'copy:dev']);
  grunt.registerTask('dev', ['default', 'watch']);
  grunt.registerTask('prod', ['clean:working', 'copy:js', 'less', 'template:views', 'imagemin', 'ngTemplateCache', 'requirejs', 'template:prod', 'minifyHtml', 'copy:prod']);
};
