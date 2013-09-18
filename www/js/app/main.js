/**
 * # Main application module
 *
 * This module configures the router and starts the application.
 */

define(function(require) {
  // Stateful router
  StatefulRouter = require('ribcage/routers/stateful').Router;

  // Application configuration
  var conf = require('app/conf');

  // Route handlers
  var hello = require('app/routes/hello');

  /**
   * ## `App`
   *
   * This is the router. It is the main hub of your application. It introduces
   * vaviews to each other, picks a router that will handle changes in the URL
   * or fragment identifier (hash).
   */
  var App = StatefulRouter.extend({

    init: function() {
      this.conf = conf;
      this.content = '#content';
    },

    routes: {
      '': hello.world
    },

  });

  var app = new App();
  app.start();
});
