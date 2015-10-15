/***
    Karma Configuration for 'dev' environment
 */
var reporters = [ 'progress' ];
if (parseInt(process.env.verboseFF, 10) === 1) {
	reporters.push('story');
}

module.exports = function(config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath : '..',
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks : [ 'jasmine' ],

		// list of files / patterns to load in the browser
		files : [
		//Add Matcher to Jasmine
		'lib/jasmine/matchers/*.js', 'lib/jasmine/mocks/*.js', 'dist/spec/**/*Spec.js', 'node_modules/es5-shim/es5-shim.js',
				'node_modules/es5-shim/es5-sham.js', 'bower_components/moment/moment.js' ],
		// list of files to exclude
		exclude : [],

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters : reporters,

		// web server port
		port : 9876,


		// enable / disable colors in the output (reporters and logs)
		colors : true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel : config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch : true,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		// grunt -v : disable singleRun
		singleRun : !parseInt(process.env.verboseFF, 10),

		// IE Emulation
		customLaunchers : {
			IE9 : {
				base : 'IE',
				'x-ua-compatible' : 'IE=EmulateIE9'
			},
			IE8 : {
				base : 'IE',
				'x-ua-compatible' : 'IE=EmulateIE8'
			}
		},


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		//browsers: ['Chrome', 'Firefox', 'IE','ChromeCanary','PhantomJS','IE8','IE9'],
		browsers : [ 'PhantomJS' ],

		// report which specs are slower than 500ms
		// CLI --report-slower-than 500
		reportSlowerThan : 500
	});
};
