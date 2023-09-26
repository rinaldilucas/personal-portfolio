module.exports = (grunt) => {
  grunt.config.set('uglify', {
    options: {
      removeComments: true,
      collapseWhitespace: true,
    },
    target: {
      files: [
        {
          expand: true,
          cwd: '<%= config.dist %>/assets/scripts',
          src: '**/*.js',
          dest: '<%= config.dist %>/assets/scripts',
        },
      ],
    },
  });
};
