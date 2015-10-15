var rekuiConf = {
    ignore : [ 'dist', 'configuration', 'grunt', 'resources' ],
    ignoreMask : '(^[_].*)|(.*spec$)',
    importNotModule : true,
    extensions : [ '.js', '.jsx' ]
},
    transforms = function(config) {
    config = config || {};

    var transformsList = [
        // React transform
        [ 'reactify', {
            'es6' : true
        } ],
        // Rekuirify (@s)
        [ 'rekuirify', rekuiConf ],
        // Babel (ES5)
        'babelify' ];

    if (config.coverage) {
        transformsList.unshift([ 'browserify-istanbul', {
            ignore : [ 'node_modules/**', '**/*Spec.js' ],
            includeUntested : true,
            defaultIgnore : true
        } ]);
    }

    return transformsList;
};

module.exports = {
    options : {
        watch : true
    },

    // App build
    app : {
        options : {
            transform : transforms()
        },
        src : './src/jsx/app/main.jsx',
        dest : './dist/js/app.js'
    }/*,

    // Tests build
    karma : {
        options : {
            transform : transforms({
                coverage : true
            })
        },
        src : '<%= files.unitTests %>',
        dest : '<%= dir.dist %>/spec/appSpec.js'
    }*/
};
