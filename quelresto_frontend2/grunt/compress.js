module.exports = {
    nexus : {
        options : {
            archive : '<%= files.nexusDistribution %>'
        },
        files : [ {
            src : [ '**' ],
            cwd : '<%= dir.dist %>',
            expand : true
        } ]
    }
};
