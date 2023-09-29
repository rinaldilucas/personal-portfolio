module.exports = (grunt) => {
  grunt.config.set('eslint', {
    options: {
      fix: true
    },
    all: {
      src: ['<%= config.source %>/scripts/**/*.ts']
    },
    watch: {
      src: ['<%= config.changedFiles %>']
    },
  });

  grunt.loadNpmTasks('grunt-eslint');
};
