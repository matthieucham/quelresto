module.exports = {
    build : {
        src : [ '<%= dir.dist %>/**/*' ]
    },
    sass : {
        src : [ '<%= dir.dist %>/css/app/blessed/**/*']
    },
    test : {
        src : [ '<%= dir.dist %>/spec/**/*', '<%= dir.dist %>/spec', '<%= dir.report %>/**/*', '<%= dir.report %>/**', '<%= dir.report %>' ]
    }
};
