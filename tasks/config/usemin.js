module.exports = (grunt) => {
  grunt.config.set('usemin', {
    html: '<%= config.dist %>/**/*.html',
    css: '<%= config.dist %>/assets/**/*.css',
    js: '<%= config.dist %>/assets/**/*.js',
    options: {
      assetsDirs: ['<%= config.dist %>', '<%= config.dist%>/assets/images']
    },
  });
};
