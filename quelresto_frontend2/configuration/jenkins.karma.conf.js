// Karma configuration


module.exports = function (config) {
    require('./prod.karma.conf.js')(config);
    config.set({
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'junit'],
        
        // configuration
        detectBrowsers: {
            // enable/disable, default is true
            enabled: false
        },

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome', 'Firefox', 'IE','ChromeCanary','PhantomJS','IE8','IE9'],
        // If no browser were found, use the phantomjs by default.
        // You need to specify the PHANTOMJS_BIN environment variable
        browsers: ['PhantomJS']
    });
};
