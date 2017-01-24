'use strict';

require.config({
  baseUrl: "app/scripts/",

  shim: {
    // Application Libs
    'underscore': {exports: "_"},
    'backbone': { deps: ['underscore', 'bootstrap'], exports: 'Backbone'},
    'bootstrap': {deps: ['jquery']},

    // Views
    'home-view': {deps: ['backbone']},
    'not-found-view': {deps: ['backbone']},

    // Utils
    'config': {deps: ['backbone']},
    'bb-utils': {deps: ['backbone']},
    'utils': {deps: ['backbone']}
  },

  paths: {
    // Application Libs
    'underscore': 'components/lodash/dist/lodash',
    'backbone': 'components/backbone/backbone',
    'jquery': 'components/jquery/dist/jquery',
    'bootstrap': 'components/bootstrap-sass/assets/javascripts/bootstrap',
    'text': 'components/text/text',

    // Views
    'home-view': 'views/home-view',
    'not-found-view': 'views/not-found-view',

    // Utils
    'config': 'utils/config',
    'bb-utils': 'utils/bb-utils',
    'utils': 'utils/utils'

  },

  deps: ['routes'],
  waitSeconds: 100,
  urlArgs: 't=' + ((new Date()).getTime())
});
