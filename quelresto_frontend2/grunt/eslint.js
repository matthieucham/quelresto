module.exports = {
    options : {
        config : '.eslintrc'
    },
    sources : [ '<%= dir.src %>/**/*.+(js|jsx)', '../sepamail-common/**/*.+(js|jsx)' ],
    tests : {
        src : [ '<%= files.unitTests %>', '<%= files.funcTests %>' ],
        options : {
            rules : {
                'no-console' : 0
            }
        }
    }
};
