/**
 * # Application state
 *
 * This module keeps track of application state in localStorage.
 *
 * Because we only need one application state per application, we will make this
 * model a singleton.
 */

define(function(require) {
  
  var ribcage = require('ribcage');

  var State = ribcage.models.LocalStorageModel.extend({
    "default": {
      started: false
    }
  });

  state = new State();
  state.on('change', function() {
    return state.save();
  });

  return state;
});
