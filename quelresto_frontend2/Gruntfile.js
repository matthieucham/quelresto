var shell = require('shelljs'),
    path  = require('path'),
    xml2js = require('xml2js');

shell.config.fatal = true;
process.env.NODE_PATH = path.join(__dirname, 'node_modules');

// ### in Gruntfile.js ###
module.exports = function (grunt) {

    // update package version if needed
    new xml2js.Parser({
        async: false
    }).parseString(grunt.file.read(__dirname + "/pom.xml"), function (err, result) {
        var version = result.project.parent[0].version;
        if (version != grunt.file.readJSON('package.json').version) {
            var command = 'npm --no-git-tag-version version ' + version;
            shell.echo('Fit package.json version to pom.xml: ' + version);
            if (shell.exec(command).code !== 0) {
                shell.echo('Error: update package version fail!');
                shell.exit(1);
            }
        }
    });
    
    // hack to fix strange behavior with empty option like --urlPrefix='' => grunt.option('urlPrefix') == 0
    var getGruntOptionValue = function (optionName, defaultValue) {
        var value = grunt.option(optionName);
        if (value === 0 || value === '0') {
            value = '';
        }
        else if (!value) {
            value = defaultValue;
        }
        return value;
    };

    var pack = grunt.file.readJSON('package.json');

    var dirConfig = {
        dist:      './dist',
        report:    './report',
        tests:     './tests',
        bower:     './bower_components',
        src:       './src',
        resources: {
            sass:    './resources/lyra/sass/app',
            fonts:   './resources/fonts',
            locales: './src/js/common/locales'
        }
    };

    var filesConfig = {
        karmaConf:         './configuration/' + (grunt.option('target') || 'dev') + '.karma.conf',
        resources:         {
            sass: dirConfig.resources.sass + '/**/*.scss'
        },
        unitTests:         dirConfig.tests + '/spec/**/*.js',
        funcTests:         dirConfig.tests + '/nightwatch/**/*.js',
        sources:           dirConfig.src + '/**/*',
        locales:           dirConfig.resources.locales + '/**/*',
        nexusDistribution: dirConfig.dist + '/nexus/' + pack.name + '-' + pack.version + '.zip'
    };

    var env = grunt.option('env') === 'prod' ? 'prod' : 'dev';
    var defaultRestUri = 'http://api.management.com/rest/api';
    var defaultUrlPrefix = '';

    // Variables
    var config = {
        pkg:             pack,
        dir:             dirConfig,
        files:           filesConfig,
        bsPort:          grunt.option('bsPort') || 8321,
        env:             env === 'prod' ? 'prod' : 'dev',
        livereloadPort:  grunt.option('livereloadPort') || 35730,
        restUri:         getGruntOptionValue('restUri', defaultRestUri),
        urlPrefix:       getGruntOptionValue('urlPrefix', defaultUrlPrefix),
        defaultLanguage: 'fr-FR',
        appVersion:      pack.version
    };

    // debug environment selected
    grunt.log.writeln(('>> Environment : ' + config.env.toUpperCase()).green);
    grunt.log.writeln(('  >> restUri: "' + config.restUri + '"').green);
    grunt.log.writeln(('  >> urlPrefix: "' + config.urlPrefix + '"').green);
    grunt.log.writeln(('  >> project version: "' + config.pkg.version + '"').green);

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        // auto grunt.initConfig
        init:     true,
        jitGrunt: {},
        // data passed into config.  Can use with <%= test %>
        data:     config
    });

    // TODO : refactor the font embedded integration

    // Sass build
    grunt.registerTask('build:sass:dev', ['clean:sass', 'sass']);
    grunt.registerTask('build:sass:prod', ['build:sass:dev', 'postcss:dist']);
    grunt.registerTask('build:sass', ['build:sass:' + config.env]);

    // Build
    grunt.registerTask('buildLight', ['processhtml:all', 'copy:all', 'build:sass', 'browserify:app']);
    grunt.registerTask('build:dev', ['clean:build', 'buildLight']);
    grunt.registerTask('build:prod', ['build:dev', 'uglify:app', 'cacheBust:assets']);
    grunt.registerTask('build', ['build:' + config.env]);

    // Tests: TODO
    grunt.registerTask('test', ['clean:test', 'eslint', 'browserify:karma', 'karma']);

    // Browser sync
    grunt.registerTask('serve', ['build', 'browserSync', 'watch']);

    // Default task
    grunt.registerTask('default', ['serve']);

    //////////////////////////////////////////////////////////////////
    // Nexus
    //////////////////////////////////////////////////////////////////
    grunt.registerTask('build:nexus', ['build:' + config.env, 'compress:nexus']);
    grunt.registerTask('mvn:deploy', 'Use maven to upload the distribution to the Nexus', function () {
        var groupId = 'com.lyra.sepamail';
        var artifactId = config.pkg.name; // use the project name from the package.json as artifactId
        var version = config.appVersion;
        var packaging = 'zip';
        var filePath = filesConfig.nexusDistribution;
        var repositoryId = 'nexus-snapshot';
        var url = 'https://nexus.lbg.office.lyra/content/repositories/snapshots';
        var generatePom = false;

        var command = 'mvn deploy:deploy-file -DgroupId=' + groupId + ' -DartifactId=' + artifactId + ' -Dversion=' + version +
            ' -Dpackaging=' + packaging + ' -Dfile=' + filePath + ' -DrepositoryId=' + repositoryId + ' -Durl=' + url +
            ' -DgeneratePom=' + generatePom;

        if (shell.exec(command).code !== 0) {
            shell.echo('Error: maven deploy to the nexus failed!');
            shell.exit(1);
        }
    });
    grunt.registerTask('publish', ['build:nexus', 'mvn:deploy']);

    //////////////////////////////////////////////////////////////////
    // Syntax
    //////////////////////////////////////////////////////////////////
    grunt.registerTask('lint', ['eslint:sources']);

    //////////////////////////////////////////////////////////////////
    // Git hooks
    //////////////////////////////////////////////////////////////////
    grunt.registerTask('pushHook', ['lint']);

    //////////////////////////////////////////////////////////////////
    // Help
    //////////////////////////////////////////////////////////////////
    // help task list
    var tasksHelp = [];
    tasksHelp.push({
        task:        '',
        description: 'Launch the grunt serve by default'
    });
    tasksHelp.push({
        task:        'serve',
        description: 'Build all, launch the application and watch for any changes'
    });
    tasksHelp.push({
        task:        'build',
        description: 'Build all (minified in prod env)'
    });
    tasksHelp.push({
        task:        'test',
        description: 'Build all and launch the test suites'
    });
    tasksHelp.push({
        task:        'lint',
        description: 'Check the js/jsx syntax with eslint'
    });
    tasksHelp.push({
        task:        'publish',
        description: 'Build the Nexus distribution and publish it'
    });
    tasksHelp.push({
        task:        'build:nexus',
        description: 'Build and zip the distribution to upload to the Nexus'
    });

    tasksHelp.push({
        task:        'help',
        description: 'Display the usage and the commonly use tasks.'
    });
    grunt.registerTask('help', function () {
        var normalizeText = function (text) {
            var taskSpace = '                         ';
            return text + taskSpace.slice(text.length);
        };

        //grunt.log.subhead('vads-admin-ui Help: ');
        grunt.log.writeln('');
        grunt.log.writeln('usage: grunt <task> [--production] [--env={prod|dev}] [--urlprefix=<value>] [--restUri=<value>] [--verbose]');
        grunt.log.writeln('');
        grunt.log.writeln('The most commonly used tasks are:');
        grunt.log.writeln('');

        var index = 0;
        for (index = 0; index < tasksHelp.length; index++) {
            var taskHelp = tasksHelp[index];
            var taskPart = normalizeText('  grunt ' + taskHelp.task);
            grunt.log.writeln(taskPart + taskHelp.description);
        }

        grunt.log.writeln('');
        grunt.log.writeln('Options:');
        grunt.log.writeln('');
        grunt.log.writeln(normalizeText('  --production') + 'Shortcut for --env=\'prod\'');
        grunt.log.writeln(normalizeText('  --env={prod|dev}') + 'Set Environment used for minification and hash (\'dev\' as default)');
        grunt.log.writeln(normalizeText('  --urlprefix=<value>') + 'Set prefix used to reference the sources (\'' + defaultUrlPrefix +
            '\' as default)');
        grunt.log.writeln(normalizeText('  --restUri=<value>') + 'Set the url of the rest service to call (\'' + defaultRestUri +
            '\' as default)');
    });
};
