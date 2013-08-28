// Place third party dependencies in www/js/lib

// Configure loading modules from the lib directory except 'app' ones, which
// are sibling directory.
requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    app: '../app',
    tpl: '../tpl'
  }
});

// Start loading the main app file. Put all your application logic in there.
requirejs(['app/main']);
