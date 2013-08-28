# Ribcage application template (JavaScript edition)

This is a [volo](http://volojs.org/)-compatible
[Ribcage](https://github.com/foxbunny/ribcage) web application template.

This template is based on the basic
[create-template](https://github.com/volojs/create-template).

This is a template for JavaScript development. There is 
[another template](https://github.com/foxbunny/create-ribcage-app) that
sets everything up for people who prefer CoffeeScript.

## Directory layout

* coffee/ - CoffeeScript sources
* www/ - the web assets for the project
    * index.html - the entry point into the app.
    * js/
        * app/ - application modules
            * models/ - the directory to hold models
                * state.js - application state model
            * routes/ - the directory to hold route handlers
                * hello.js - example route handler
            * views/ - the directory to hold views
                * hello.js - example view
            * conf.js - application configuration
            * main.js - application router and basic setup
        * app.js - Basic setup module that configures RequireJS
        * lib/ - the directory to hold third party scripts.
        * tpl/ - the directory to hold templates
* tools/ - the build tools to optimize the project and HTTP server.

## Creating a project using volo

To create a project using volo, run:

    volo create my_project_name foxbunny/create-ribcage-app-js

Volo will take care of installing all dependencies, so you can skip that part
in the next section.

## Preparing the project

To keep the template small, dependencies are not included. Install them using
the following command:

    volo add

You will get a few warnings about different packages trying to install a
different version of jQuery, but that is expected, and you should ignore them.

You may also want to install a few Node dependencies (and, indeed, NodeJS
itself) before proceeding. Installing NodeJS is outside the scope of this
document. To install the development dependencies, simply run:

    npm install

Although installing some of the dependencies may show some warnings on Windows,
it should all just work in the end.

## Building

To optimize, run:

    volo build

This will run the "build" command in the volofile that is in this directory.

That build command creates an optimized version of the project in a
**www-built** directory. The js/app.js file will be optimized to include
all of its dependencies.

For more information on the optimizer:
http://requirejs.org/docs/optimization.html

For more information on using requirejs:
http://requirejs.org/docs/api.html

## Included server

To start the built-in server, run:

    volo serve

The server will be accessible at [localhost:8080](http://localhost:8080/). 

The included server is a simple HTTP server with reverse proxy capability. The
file is called `proxy.js` and is located in the `tools` directory. You can
customize the behavior of the server by editing a few all-caps variables inside
the file. The variables are commented, so please read the source code.

By default, the server binds to 0.0.0.0. You can edit the `proxy.js` file to
customize that (just search for 0.0.0.0 and change that to anything you want,
like 127.0.0.1).

## Known issues

Compiling or watch-compiling CoffeeScript will create a directory `-p` in the
source tree (confirmed on Windows). I still haven't figured out why this
happens. The directory empty and it is in .gitignore file, so it won't do any
harm. I understand if you find it annoying, though.
