module.exports = {
       options : {
            processors : [ require('pixrem')(), // add fallbacks for rem units
            require('autoprefixer-core')({
                browsers : ['ie 9', 'ie 10', 'last 2 versions' ] //https://github.com/ai/browserslist
            }),
            require('cssnano')() // minify the result
            ]
        },
        dist : {
            src : './dist/css/app/blessed/*.css'
        }
};