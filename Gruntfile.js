'use strict';

var path = require('path'),
    moment = require('moment'),
    config = require('./server/config/config.js'),
    LIVERELOAD_PORT = config.LIVERELOAD_PORT,
    SERVER_PORT = config.SERVER_PORT,
    folders = {
      app: 'app',
      dist: 'dist',
      server: 'server',
      server_dist: 'server_dist'
    }
  ;


module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    dir: folders,

    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },

      jst: {
        files: [
          '<%= dir.app %>/scripts/templates/*.ejs'
        ],
        tasks: ['jst']
      },

      sass: {
        files: ['<%= dir.app %>/scss/{,*/}*.scss'],
        tasks: ['sass:server'],
        options: {
          livereload: true,
        }
      },

      js: {
        files: ['<%= dir.app %>/scss/{,*/}*.scss'],
        tasks: ['sass:server'],
        options: {
          livereload: true,
        }
      },

      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          './Gruntfile.js',
          '<%= dir.app %>/*.html',
          '<%= dir.app %>/scss/{,*/}*.scss',
          '<%= dir.app %>/scripts/**/*.js',
          '<%= dir.app %>/scripts/templates/**/*.ejs',
          '!<%= dir.app %>/scripts/components/**/*.*'
        ]
      },

      express: {
        files: ['server/**/*.js'],
        tasks: ["express:dev"],
        options: {
          spawn: false
        }
      }
    },

    express: {
      dev: {
        options: {
          script: 'server/app.js',
          port: SERVER_PORT,
          debug: true
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:' + SERVER_PORT
      }
    },

    clean: {
      dist: ['.tmp', 'dist', 'server_dist', 'archive', '<%= dir.app %>/css/', '<%= dir.app %>/scripts/templates.js'],
      server: ['.tmp']
    },

    sass: {
      server: {
        files: {
          '<%= dir.app %>/css/app.css': '<%= dir.app %>/scss/app.scss'
        },
        options: {
          outFile: '<%= dir.app %>/css/app.css',
          sourceMaps: false,
          outputStyle: "expanded"
        }
      },

      dist: {
        files: {
          '<%= dir.app %>/css/app.css': '<%= dir.app %>/scss/app.scss'
        },
        options: {
          outFile: '<%= dir.app %>/css/app.css',
          sourceMaps: false,
          environment: 'production',
          outputStyle: "compressed"
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dir.app %>/images',
          src: '{,*/}*.{gif,png,jpg,jpeg}',
          dest: '<%= dir.dist %>/app/images'
        }]
      }
    },

    shell: {
      buildjs: {
        command: 'node ./deploy/app.build.js'
      }
    },

    jst: {
      options: {
        amd: true
      },
      compile: {
        files: {
          '<%= dir.app %>/scripts/templates.js': ['<%= dir.app %>/scripts/templates/*.ejs']
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dir.app %>',
          dest: '<%= dir.dist %>/app',
          src: [
            'index.html',
            '*.{ico,txt}',
            'css/{,*/}*.css',
            'fonts/{,*/}*.*',
            'scripts/templates.js'
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= dir.server %>',
          dest: '<%= dir.server_dist %>',
          src: [
            'app.js',
            'auth.js',
            'config/{,*/}*.js',
            'kave/{,*/}*.js',
            'routes/{,*/}*.js'
          ]
        }]
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= dir.dist %>/app/index.html',
            '<%= dir.dist %>/app/scripts/{,*/}*.js',
            '<%= dir.dist %>/app/css/{,*/}*.css',
            '<%= dir.dist %>/app/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= dir.dist %>/app/css/fonts/{,*/}*.*'
          ]
        }
      }
    },

    manifest: {
      generate: {
        options: {
          basePath: '<%= dir.dist %>',
          cache: ['app/index.html', 'error.ejs'],
          network: ['http://*', 'https://*'],
          fallback: ['/error.ejs'],
          preferOnline: true,
          verbose: true,
          timestamp: true,
          hash: true,
          master: ['app/index.html']
        },
        src: [
          'app/images/{,*/}*.{jpg,png,gif}',
          'app/fonts/{,*/}*.*',
          'app/scripts/{,*/}*.js',
          'app/css/{,*/}*.css'
        ],
        dest: '<%= dir.dist %>/offline.appcache'
      }
    },

    compress: {
      main: {
        options: {
          archive: function () {
            var date = moment().format("MM-DD-YYYY");
            return 'archive/built-on-' + date + '.zip'
          },
          mode: 'zip'
        },
        files: [
          {
            expand: true,
            src: [
              '.bowerrc',
              '.gitignore',
              'dist/**',
              'server_dist/**',
              'package.json',
              'bower.json',
              'deploy/**',
              'readme.md'
            ]
          }
        ]
      }
    },

    upload_file: {
      "test": {
        src: ['archive/*.zip'],
        options: {
          url: 'http://uploadservice/upload',
          method: 'POST',
          qs: {
            'gray': true,//true(default):for test server;false:for official servers;
            'rollback': false,//true(default):backup for rollback;false:don't backup;
            'autoPublish': true,//true(default):auto run scripts;false:manual run scripts;
            'wholePackage': true,//false(default):only patch;true:full package(rm the old one);
            'production': 'KPMG BlueSense',//project name
            'npmUpdated': false,//true:npm install --production;false(default):nothing;
            "pm2Script": false//true:pm2 startOrRestart pm2.json;false(default):nothing;
          }
        }
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec',
        timeout: 5e3
      },
      unit: {
        src: ['test/server/*.spec.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('config', function () {

    var appconfig =
        "'use strict';\n\n" +
        "// this is automatically generated, don't touch it!\n\n" +
        "define(['backbone'], function (B) {\n" +
        "  return {\n" +
        "    environment: {\n" +
        "      SERVER_PORT: \"" + config.SERVER_PORT + "\",\n" +
        "      LIVERELOAD_PORT: \"" + config.LIVERELOAD_PORT + "\",\n" +
        "      activeApps: \"" + config.activeApps + "\",\n" +
        "      serverRoot: \"" + folders.server + "\",\n" +
        "      appRoot: \"" + folders.app + "\",\n" +
        "      app: \"" + config.app.name + "\"\n" +
        "    },\n\n" +
        "    getEnv: function () { \n" +
        "      var env = ''; \n\n" +
        "      switch (window.location.hostname) { \n" +
        "        case \"localhost\": \n" +
        "        case \"127.0.0.1\": \n" +
        "          env = \"Development\"; \n" +
        "          break; \n\n" +
        "        case \"test.domain.net\": \n" +
        "          env = \"Test\"; \n" +
        "          break; \n\n" +
        "        case \"prod.domain.net\": \n" +
        "          env = \"Production\"; \n" +
        "          break; \n\n" +
        "        default: \n" +
        "          env = \"Unknown\"; \n" +
        "          throw(\"Unknown environment: \" + window.location.hostname ); \n" +
        "      } \n\n" +
        "      return env; \n" +
        "    } \n" +
        "  };\n" +
        "});\n"
      ;

    grunt.file.defaultEncoding = 'utf-8';
    grunt.file.write('./app/scripts/utils/config.js', appconfig);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('Deprecated task. Use `grunt serve` to start a server.');
    grunt.task.run(['serve' + (target ? ':' + target : '')]);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:server']);
    }

    grunt.task.run([
      'clean:server',
      'jst',
      'config',
      'sass:server',
      'express:dev',
      'open:server',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jst',
    'config',
    'sass:dist',
    'shell:buildjs',
    'copy',
    'imagemin',
    'manifest'
  ]);

  grunt.registerTask('test', [
    'jst',
    'karma',
    'mochaTest'
  ]);

  grunt.registerTask('upload', [
    'compress',
    'upload_file:test'
  ]);
};
