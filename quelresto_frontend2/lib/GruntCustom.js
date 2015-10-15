/***
    List of functions for Grunt

 */

var grunt = require('grunt');
var opt = require('./constants.js').opt;
var shell = require('shelljs');


// default configuration <==> dev mode
function getDefaultConfiguration(defaultConfiguration) {
	return {
		'env' : defaultConfiguration.env,
		'karma' : defaultConfiguration.karma,
		'suffix' : defaultConfiguration.suffix
	};
}

function getProductionConfiguration(defaultConfiguration) {
	return {
		'env' : defaultConfiguration.env,
		'karma' : defaultConfiguration.karma,
		'suffix' : defaultConfiguration.suffix
	};
}

/**
 Setup mode
 */
function modeDefine(env) {
	var modes = [ opt.env.dev, opt.env.prod, opt.env.jenkins ];
	//Default env : dev
	if (modes.indexOf(env) === -1) {
		env = modes[0];
	}

	var modeInit = env;

	if (env === opt.env.jenkins) {
		env = opt.env.prod;
	}

	var defaultConfiguration = {
		'env' : env,
		'karma' : 'configuration/' + modeInit + '.karma.conf.js',
		'suffix' : ((env === opt.env.prod) ? '.min' : '')
	};

	var configuration;
	if (env === modes[1]) {
		//Prod Mode
		configuration = getProductionConfiguration(defaultConfiguration);
	} else {
		configuration = getDefaultConfiguration(defaultConfiguration);
	}
	process.env.ENVIRONMENT = env;

	return configuration;
}


/**
 Help Description
 **/
/*jshint ignore:start,-W104*/
function help(grunt) {
	grunt.log.subhead('Tips: ');
	grunt.log.oklns('Verbose mode: ');
	grunt.log.writeln('     grunt ' + '-v'['magenta']);
	grunt.log.oklns('Update GIT Hooks: ');
	grunt.log.writeln('     grunt ' + 'hooks'['magenta']);

	grunt.log.subhead('Tests: ');
	grunt.log.oklns('      Launch tests (like GIT push hook):');
	grunt.log.writeln('         grunt ' + 'fullTests'['magenta']);
	grunt.log.oklns('      Enable development mode: ');
	grunt.log.writeln('         grunt test --' + opt.env.name + '=' + opt.env.dev);
	grunt.log.oklns('      Enable production mode and code coverage generation: ');
	grunt.log.writeln('         grunt test --' + opt.env.name + '=' + opt.env.prod);
	grunt.log.oklns('      Launch test in debug\\verbose mode : ');
	grunt.log.writeln('         grunt ' + 'test -v'['magenta']);
	grunt.log.oklns('      Launch specific test: ');
	grunt.log.writeln('     grunt test --' + opt.bFilter['magenta'] + '="*WindowSpec.js"' + ''['magenta']);
	grunt.log.oklns('   Watching files for testing: ');
	grunt.log.writeln('     grunt ' + 'watch:test'['magenta']);

	grunt.log.subhead('Reporting: ');
	grunt.log.oklns('      Generate (jsdoc ...) : ');
	grunt.log.writeln('     grunt ' + 'report'['magenta']);

	grunt.log.subhead('Build\\Deploy:');
	grunt.log.oklns('   Build on local directory: ');
	grunt.log.writeln('     grunt ' + 'build'['magenta']);
	grunt.log.oklns('   Deploy on web server: ');
	grunt.log.writeln('     grunt ' + 'deploy'['magenta']);

	grunt.log.oklns('   Watching files for building: ');
	grunt.log.writeln('     grunt watch:build');
	grunt.log.oklns('   Watching files for deploying: ');
	grunt.log.writeln('     grunt watch:deploy');

	grunt.log.oklns('   Launch webserver with watcher and livereload: ');
	grunt.log.writeln('     grunt ' + 'serve'['magenta']);
}
/*jshint ignore:end,+W101*/


/**
 * Merge two Object
 * @param {Object} target
 */
function merge(target) {
	var sources = [].slice.call(arguments, 1);
	sources.forEach(function(source) {
		for ( var prop in source) {
			target[prop] = source[prop];
		}
	});
	return target;
}

/**
 * Filter definition for Karma
 * @param {} grunt
 * @param {} option
 * @return {}
 */
function browFilter(grunt, option) {
	if (option) {
		process.env.browFilter = option;
		grunt.log.oklns('Browserify filter defined: ' + process.env.browFilter);
	}
}

/**
 * launch synchronous command
 * @param {String} shell command
 * @param {String} Error Message
 */
function launchShell(command, msgErr) {
	grunt.log.ok(command);
	if (shell.exec(command, {
		async : false
	}).code !== 0) {
		shell.echo(msgErr);
		shell.exit(1);
	}
}


/* ----------------------------------------------------------------------------
 Module Export
 */
module.exports = {
	merge : merge,
	help : help,
	modeDefine : modeDefine,
	browFilter : browFilter,
	launchShell : launchShell
};