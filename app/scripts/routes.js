'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'home-view',
    'not-found-view',
    'bb-utils'
  ],

  function (
    $,
    _,
    Backbone,
    bootstrap,
    HomeView, NotFoundView,
    bbUtils
  ) {

    var AppRouter = Backbone.Router.extend({
      routes: {
        '(/)': 'home',
        '(/)*notFound': 'notFound'
      },

      initialize: function () {
        // this.apiService = new ApiService();
        // $('#api-view').html(this.apiService.render());
      },

      home: function () {
        this.showView('#ui-view', new HomeView());
      },

      notFound: function () {
        this.showView('#ui-view', new NotFoundView());
      },

      showView: function (selector, view) {
        var currentRoute = Backbone.history.getFragment().split('/');
        if (this.currentView) this.currentView.close();

        // set the data-route attr in the body tag
        $('body')
          .attr('data-route', currentRoute[0] !== '' ? currentRoute[0] : 'home')
          .attr('data-deep-route', currentRoute[1] !== '' ? currentRoute[1] : null);

        // RENDER the VIEW on ROUTE CHANGE!
        $(selector).html(view.render());
        this.currentView = view;

        return view;
      }
    });

    new AppRouter();
    Backbone.history.start();
  });
