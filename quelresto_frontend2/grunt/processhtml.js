module.exports = {
  options : {
    data : {
      process : true,
      // Custom data to add here
      restUri : '<%= restUri %>',
      urlPrefix : '<%= urlPrefix %>',
      defaultLanguage : '<%= defaultLanguage %>',
      appVersion : '<%= pkg.version %>'
    }
  },
  all : {
    files : {
      './dist/index.html' : [ './src/index.html' ]
    }
  }
};
