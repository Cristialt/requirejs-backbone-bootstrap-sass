// Run the build with: `node deploy/app.build.js`

var
  requirejs = require('./r.js'),

  baseConfig = {
    baseUrl: "./app/scripts/",
    wrap: true,
    preserveLicenseComments: false,
    optimize: "uglify"
  },

  configs = [{
    mainConfigFile: "./app/scripts/main.js",
    // detected by r.js static analysis - is loaded dynamically in App.js
    include: ["../../app/scripts/main.js", "../../app/scripts/routes.js"],
    // The optimized build file will put within the app directory
    out: "./dist/app/scripts/main.js"
  }],

  mix = function (target) {
    for (var prop in baseConfig) {
      if (baseConfig.hasOwnProperty(prop)) target[prop] = baseConfig[prop];
    }
    return target;
  },

  // Create  a runner that will run a separate build for each item in the configs array.
  runner = configs.reduceRight(function (prev, currentConfig) {
    return function (buildReportText) {
      requirejs.optimize(mix(currentConfig), prev);
    }
  }, function (buildReportText) {
    console.log(buildReportText);
  });

console.log("Building the javascript app for production...");

// go build it!
runner();
