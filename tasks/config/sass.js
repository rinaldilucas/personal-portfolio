const sass = require('sass');

module.exports = (grunt) => {
  grunt.config.set('sass', {
    options: {
      implementation: sass,
      includePaths: ['./node_modules/'],
      sourceMap: true,
      quietDeps: true,
    },
    watch: {
      files: {
        '<%= config.develop %>/assets/styles/main.css': '<%= config.source %>/styles/main.scss',
        '<%= config.develop %>/assets/styles/fonts.css': '<%= config.source %>/styles/fonts.scss',
      },
    },
    dist: {
      options: {
        outputStyle: 'compressed',
        sourceMap: false,
      },
      files: {
        '<%= config.dist %>/assets/styles/main.css': '<%= config.source %>/styles/main.scss',
        '<%= config.dist %>/assets/styles/fonts.css': '<%= config.source %>/styles/fonts.scss',
      },
    },
  });
};
