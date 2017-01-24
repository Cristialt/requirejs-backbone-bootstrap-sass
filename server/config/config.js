require('dotenv').config();

var
  path = require('path'),
  serverPath = path.normalize(__dirname + '/..'),
  appPath = path.normalize(__dirname + '/../../app'),
  root = path.normalize(__dirname + '/../..'),
  LIVERELOAD_PORT = 34567,
  SERVER_PORT = 3001,
  env = process.env.NODE_ENV || 'development';

var config = {
  // Local development environment that's only supposed to be run during development:
  development: {
    SERVER_PORT: SERVER_PORT,
    LIVERELOAD_PORT: LIVERELOAD_PORT,
    appPath: appPath,
    serverPath: serverPath,
    root: root,
    app: {
      name: 'RBB dev'
    }
  },

  // Test deployment
  test: {
    SERVER_PORT: SERVER_PORT,
    LIVERELOAD_PORT: LIVERELOAD_PORT,
    appPath: appPath,
    serverPath: serverPath,
    root: root,
    app: {
      name: 'RBB test'
    }
  },

  // Production deployment
  production: {
    SERVER_PORT: SERVER_PORT,
    LIVERELOAD_PORT: LIVERELOAD_PORT,
    appPath: appPath,
    serverPath: serverPath,
    root: root,
    app: {
      name: 'RBB prod'
    }
  }};

console.info("Using config for environment: " + env);

module.exports = config[env];
