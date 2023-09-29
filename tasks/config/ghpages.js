module.exports = (grunt) => {
  grunt.initConfig({
    'gh-pages': {
      options: {
        base: 'dist', // Specify the folder you want to deploy
      },
      src: ['**/*'],
    },
  });

  grunt.loadNpmTasks('grunt-gh-pages');
};
