module.exports = {
    options : {
        screwIE8 : true,
        preserveComments : false
    },
    app : {
        files : {
            '<%= dir.dist %>/js/app.js': ['<%= dir.dist %>/js/app.js']
        }
    }
};
