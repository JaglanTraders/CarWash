// Karma configuration
// Generated on Mon Jul 20 2015 12:33:04 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
		'bower_components/angular/angular.js',
		'bower_components/angular-animate/angular-animate.js',
		'bower_components/angular-aria/angular-aria.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'bower_components/angular-cookies/angular-cookies.js',
		'bower_components/angular-sanitize/angular-sanitize.js',
		'bower_components/angular-translate/angular-translate.js',
		'bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
		'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/jquery/dist/jquery.js',
		'bower_components/oclazyload/dist/ocLazyLoad.js',
		'bower_components/bootstrap/dist/js/bootstrap.js',
		'web/**/*.js',
		'test/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
