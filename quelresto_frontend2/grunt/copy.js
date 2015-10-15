module.exports = function(grunt) {
    var suffix = grunt.option('env') === 'prod' ? '.min' : '',
        modulesPath = 'node_modules';

    return {
        options : {
            cwd : './',
            expand : true
        },

        all : {
            files : [ { // Bootstrap js files
                src : '<%= dir.bower %>/bootstrap/dist/js/bootstrap' + suffix + '.js',
                dest : '<%= dir.dist %>/js/bootstrap.js'
            }, { // Moment
                src : modulesPath + '/moment/min/moment-with-locales' + suffix + '.js',
                dest : '<%= dir.dist %>/js/moment.js'
            }, {
                src : modulesPath + '/eventemitter2/lib/eventemitter2.js',
                dest : '<%= dir.dist %>/js/eventemitter2.js'
            }, {
                src : '<%= dir.bower %>/modernizr/modernizr.js',
                dest : '<%= dir.dist %>/js/modernizr.js'
            }, {
                src : '<%= dir.bower %>/polyfills/polyfill' + suffix + '.js',
                dest : '<%= dir.dist %>/js/polyfill.js'
            }, {
                src : '<%= dir.bower %>/jquery-validate/dist/jquery.validate' + suffix + '.js',
                dest : '<%= dir.dist %>/js/jquery.validate.js'
            }, {
                src : '<%= dir.bower %>/jquery-ui/jquery-ui' + suffix + '.js',
                dest : '<%= dir.dist %>/js/jquery-ui.js'
            }, {
                src : '<%= dir.bower %>/jquery-ui/themes/ui-lightness/jquery-ui' + suffix + '.css',
                dest : '<%= dir.dist %>/css/jquery-ui/jquery-ui.css'
            }, {
                src : '*.*',
                expand : true,
                cwd : '<%= dir.bower %>/jquery-ui/themes/ui-lightness/images/',
                dest : '<%= dir.dist %>/css/jquery-ui/images/'
            }, {
                src : '<%= dir.bower %>/jquery-cookie/jquery.cookie.js',
                dest : '<%= dir.dist %>/js/jquery.cookie.js'
            }, {
                src : '<%= dir.bower %>/jquery/dist/jquery' + suffix + '.js',
                dest : '<%= dir.dist %>/js/jquery.js'
            }, {
                src : modulesPath + '/bootstrap-sass/assets/javascripts/bootstrap' + suffix + '.js',
                dest : '<%= dir.dist %>/js/bootstrap.js'
            }, {
                src : '**/*.*',
                expand : true,
                cwd : modulesPath + '/bootstrap-sass/assets/fonts/',
                dest : '<%= dir.dist %>/font/'
            }, {
                src : modulesPath + '/bootstrap-switch/dist/js/bootstrap-switch' + suffix + '.js',
                dest : '<%= dir.dist %>/js/bootstrap-switch.js'
            }, {
                src : modulesPath + '/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch' + suffix + '.css',
                dest : '<%= dir.dist %>/css/bootstrap-switch.css'
            }, {
                src : modulesPath + '/font-awesome/css/font-awesome' + suffix + '.css',
                dest : '<%= dir.dist %>/css/font-awesome.css'
            }, {
                src : '*',
                expand : true,
                cwd : modulesPath + '/font-awesome/fonts/',
                dest : '<%= dir.dist %>/fonts/'
            }, /* MESSENGERS */{
                src : '<%= dir.bower %>/messenger/build/js/messenger' + suffix + '.js',
                dest : '<%= dir.dist %>/js/messenger.js'
            }, {
                src : '<%= dir.bower %>/messenger/build/css/messenger.css',
                dest : '<%= dir.dist %>/css/messenger.css'
            }, {
                src : '<%= dir.bower %>/messenger/build/css/messenger-spinner.css',
                dest : '<%= dir.dist %>/css/messenger-spinner.css'
            }, {
                src : '<%= dir.bower %>/messenger/build/css/messenger-theme-flat.css',
                dest : '<%= dir.dist %>/css/messenger-theme-flat.css'
            }, {
                src : '*.*',
                expand : true,
                cwd : 'resources/contrib/favicons/',
                dest : '<%= dir.dist %>/favicons/'
            }, {
                src : '**/*.*',
                expand : true,
                cwd : 'resources/contrib/css/app/',
                dest : '<%= dir.dist %>/css/app/'
            }, {
                src : '**/*.*',
                expand : true,
                cwd : 'resources/contrib/imgs/',
                dest : '<%= dir.dist %>/imgs/'
            }, {
                src : '**/*.*',
                expand : true,
                cwd : 'resources/lyra/imgs/',
                dest : '<%= dir.dist %>/imgs/'
            }, {
                src : '**/*.*',
                expand : true,
                cwd : 'resources/contrib/font/',
                dest : '<%= dir.dist %>/font/'
            } ]
        }
    };
};
