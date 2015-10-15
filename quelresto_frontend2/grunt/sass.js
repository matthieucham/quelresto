module.exports = {
    dev : {
        options : {
            style : 'expanded',
            compass : false
        },
        files : [ {
            expand : true,
            cwd : '<%= dir.resources.sass %>',
            src : '*.scss',
            dest : './dist/css/app/blessed/',
            ext : '.css'
        } ]
    }
};
