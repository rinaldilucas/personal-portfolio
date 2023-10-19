module.exports = (grunt) => {
  grunt.config.set('rev', {
    options: {
      encoding: 'utf8',
      algorithm: 'md5',
      length: 8,
    },
    files: [
      '<%= config.dist %>/assets/scripts/*.js',
      '<%= config.dist %>/assets/styles/*.css',
    ],
  });
};
