module.exports = function(grunt) {
  return {
    options : {
      encoding : 'utf8',
      algorithm : 'sha1',
      length : 40,
      baseDir : './dist/',
      deleteOriginals: true,
      filters: {
        'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]': [
          function() {
            return this.attribs.href;
          }
        ]
      }
    },
    assets : {
      files : [ {
        src : [ 'dist/index.html' ]
      } ]
    }
  };
};