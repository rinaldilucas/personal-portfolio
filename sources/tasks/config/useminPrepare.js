module.exports = (grunt) => {
  grunt.config.set('useminPrepare', {
    html: '[<%= config.dist %>/**/*.html]',
  });

  grunt.loadNpmTasks('grunt-usemin');
};
