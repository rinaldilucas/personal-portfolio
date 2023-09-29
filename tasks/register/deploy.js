module.exports = function(grunt) {
  grunt.registerTask('deploy', ['build', 'gh-pages', 'clean']);
};
