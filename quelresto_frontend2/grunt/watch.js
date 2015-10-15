module.exports = {
    options : {
        livereload : '<%= livereloadPort %>'
    },

    sass : {
        options : {
            livereload : false
        },
        files : ['<%= files.resources.sass %>', './node_modules/sepamail-common/resources/*.scss'],
        tasks : [ 'sass' ]
    }
};
