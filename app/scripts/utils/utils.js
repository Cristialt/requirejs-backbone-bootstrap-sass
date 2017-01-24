"use strict";

define(['underscore', 'config'], function (_, Config) {
  return (function () {
    var DEBUG_MODE = Config.getEnv() === 'Development';

    return {
      // development?
      debugMode: DEBUG_MODE,

      // baseUrl based on the active environment - currently DEV & TEST
      baseUrl: (DEBUG_MODE) ? 'http://localhost:' + Config.environment.SERVER_PORT : 'https://domain.net',

      // api loaded?
      loading: function () {
        if (arguments[0] === true) {
          $('#data-spinner').removeClass('loaded').addClass('loading');
          $('body').addClass('is-loading');
        } else {
          $('#data-spinner').removeClass('loading').addClass('loaded');
          $('body').removeClass('is-loading');
        }
      }
    }
  })();
});
