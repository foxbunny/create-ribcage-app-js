/**
 * # HelloWorld view
 * 
 * This view renders a template that shows the canonical 'Hello world' text.
 */

define(function(require) {
  var ribcage = require('ribcage');
  var tHello = require('text!tpl/hello.tpl');

  /**
   * ## `HelloView`
   *
   * This is a Ribcage template view. You do not need to worry about the
   * `#render()` method or anything because the base `TemplateView` will take
   * care of that.
   */
  var HelloView = ribcage.views.TemplateView.extend({
    templateSource: tHello

    // Having the template precompiled may also be a small performance gain, so
    // instead of the `templateSource` key, you may have something like:
    //
    // template: _.template tHello
  });

  return HelloView;
});
