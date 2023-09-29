module.exports = (grunt) => {
  grunt.config.set('gh-pages', {
    options: {
      base: 'dist',
    },
    src: ['**/*'],
  });

  grunt.loadNpmTasks('grunt-eslint');
};
