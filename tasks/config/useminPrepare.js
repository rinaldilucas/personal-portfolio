module.exports = (grunt) => {
  grunt.config.set('useminPrepare', {
    html: '<%= config.dist %>/index.html',
  });

  grunt.loadNpmTasks('grunt-usemin');
};
