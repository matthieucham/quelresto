// Karma configuration


module.exports = function(config) {
	require('./dev.karma.conf.js')(config);
	config.set({
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks : [ 'jasmine', 'detectBrowsers' ],

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters : [ 'progress', 'junit', 'coverage' ],

		// optionally, configure the reporter
		coverageReporter : {
			dir : './report/coverage',
			reporters : [ {
				type : 'html'
			}, {
				type : 'text'
			}, {
				type : 'cobertura'
			} ]
		},

		junitReporter : {
			// will be resolved to basePath (in the same way as files/exclude patterns)
			outputFile : 'report/junit/test-results.xml'
		},

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun : true,

		// configuration
		detectBrowsers : {
			// enable/disable, default is true
			enabled : true,

			// enable/disable phantomjs support, default is true
			usePhantomJS : true,

			postDetection : function(availableBrowser) {
				//Add IE Emulation
				var result = availableBrowser;
				if (availableBrowser.indexOf('IE') > -1) {
					result.push('IE9');
				}

				return result;
			}
		}
	});
};
