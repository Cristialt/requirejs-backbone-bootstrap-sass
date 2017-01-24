'use strict';

define([
  'underscore',
  'backbone',
  'text!templates/home.ejs'
], function (_, Backbone, tpl) {

  var HomeView = Backbone.View.extend({
    initialize: function () {
      this.template = _.template(tpl);
    },

    render: function () {
      var message = 'Application';

      var d = new Date(), day = d.getDate(), month = d.getMonth(), year = d.getFullYear(),
          months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"),
          today = day + ' - ' + months[month] + ' - ' + year;

      this.$el.html(this.template({text: message, date: today}));
      return this.$el;
    }
  });

  return HomeView;
});
