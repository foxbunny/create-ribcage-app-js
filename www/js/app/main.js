/**
 * # Main application module
 *
 * This module configures the router and starts the application.
 */

define(function(require) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  // Application configuration
  var conf = require('app/conf');

  // Application state
  var state = require('app/models/state');

  // Route handlers
  var hello = require('app/routes/hello');

  /**
   * ## `App`
   *
   * This is the router. It is the main hub of your application. It introduces
   * vaviews to each other, picks a router that will handle changes in the URL
   * or fragment identifier (hash).
   */
  var App = Backbone.Router.extend({

    initialize: function() {
      this._activeViews = [];

      // Set properties that should be expose to route handlers and views.
      // Note that this is the least secure approach. In general, you should
      // only expose what applications actually need.
      this.conf = conf;
      this.state = state;
      this.content = '#content';
    },

    routes: {
      '': hello.world
    },

    /** 
     * ### `App.prototype.register(view)`
     *
     * Register a `view` as currently active and also sets its `app` property
     * to this instance. It returns the view object for further chaining.
     *
     * It is highly recommended to register each view with the router, not just
     * because views gain access to the router that way, but also because a
     * call to the `#cleanup()` method will also unregister the views and call
     * the view's own cleanup methods.
     */
    register: function(view) {
      this._activeViews.push(view);
      view.app = this;
      return view;
    },

    /**
     * ### `App.prototype.cleanup()`
     *
     * Cleans up all registered views. Returns the router instance for
     * chaining.  You should generally call this whenever you are setting up a
     * blank page from scratch.
     *
     * If the view implements a `#cleanup()` method, it will be called. You do
     * not need to call view's `#remove()` method since that will be taken care
     * of by the router's cleanup.
     */
    cleanup: function() {
      _.forEach(this._activeViews, function(view) {
        if (typeof view.cleanup === 'function') {
          view.cleanup();
        }
        return view.remove();
      });
      this._activeViews = [];
      return this;
    },

    /**
     * ### `App.prototype.go(hash)`
     *
     * Simple wrapper for App.navigate to ease the pain of having to type
     * trigger: true. :)
     */
    go: function(hash) {
      return this.navigate(hash, {trigger: true});
    }
  });

  var app = new App();
  app.state.set({started: true});
  Backbone.history.start();
  return app;
});
