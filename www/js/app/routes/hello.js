/**
 * # Example route handler
 */

define(function(require) {

  var HelloView = require('app/views/hello');

  return {

    /**
     * ## `world()`
     *
     * This is a route handler. It is bound to the App router, so you can
     * reference the router by using `this` (or `@` in CoffeeScript).
     */
    world: function() {
      this.cleanup();
      this.register(new HelloView()).render().$el.appendTo(this.content);
    }

  };
});
