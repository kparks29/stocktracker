// Karma configuration
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'src/',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'lib/angular/angular.min.js',
      'lib/angular-ui-router/release/angular-ui-router.min.js',
      'lib/angular-mocks/angular-mocks.js',
      'lib/lodash/lodash.min.js',
      'lib/angular-moment/angular-moment.min.js',
      'lib/ngstorage/ngStorage.min.js',
      'app/app.js',
      'app/app.config.js',
      'app/app.run.js',
      { pattern: 'assets/**/*.png', included: false, watched: false, served: true },
      'app/**/*.js',
      'common/**/*.js',
      '!(lib)/**/*.spec.js',
      '!(lib)/**/*.html'
    ],

    // see https://github.com/karma-runner/karma/issues/872
    proxies: {
      // '/assets/': 'http://localhost:8100/src/assets/'
    },


    ngHtml2JsPreprocessor: {
      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('templates')
      moduleName: 'templates'
    },


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '!(lib)/**/!(*.spec).js': ['coverage'],
      '!(lib)/**/*.html': ['ng-html2js'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'threshold'],


    coverageReporter: {
      type: 'html',
      dir: '../coverage/'
    },


    // the configure thresholds
    thresholdReporter: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS2'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
