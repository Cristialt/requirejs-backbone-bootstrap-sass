'use strict';

define (['underscore', 'backbone' ], function (_, Backbone) {

  // Backbone close method for unbinding the ghost views
  Backbone.View.prototype.close = function () {
    if (this.beforeClose) this.beforeClose();
    this.remove();
    this.unbind();
  };

  // Top-level variable references in our Underscore.js templates
  _.templateSettings.variable = 'rbb';

});
