# Requirejs Backbone Bootstrap-sass

A single-page app built with Backbone and Requirejs. This is a complete setup featuring an Express server, a gruntfile managing the common tasks and a single page web app built on top of Require.js and Backbone.js. The UI framework of choice here is Twitter Bootstrap with Sass.

### Getting started

- Install node and npm.
- Install grunt and bower globally. Run `npm i -g grunt bower`; might need to prefix `sudo` on Linux/MacOS.
- Run `npm install` to install the dependencies for the server-based JavaScript code (NodeJS/Express).
- Run `npm start` or `grunt serve` to start the development environment on localhost.
- Run `grunt build -prod` to build for production. This will create directories `app/css`, `dist`, `server_dist`. `dist` contains a compiled version of `app`.  

- This also includes a simple Express server, so you're ready to build you Backbone SPA as simple as `npm i ; npm serve`
- `/deploy` folder contains the necesary config for building all the Javascript AMD structured bundle into a single file. Thus, it is a good practice to keep your requirejs config obejct very clean a clear beucause it's used here too.
- the `/app/scss` folder contains a sample of atomic design, keeping minimal styling on elements in order to create meaningful and reusable components; use it responsibly!
