'use strict';

define([
  'underscore',
  'backbone',
  'text!templates/not-found.ejs'
], function (_, Backbone, tpl) {

  var NotFoundView = Backbone.View.extend({
    initialize: function () {
      this.template = _.template(tpl);
    },

    render: function () {
      this.$el.html(this.template());
      return this.$el;
    }
  });

});
