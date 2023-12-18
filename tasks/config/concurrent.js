module.exports = (grunt) => {
  grunt.config.set('concurrent', {
    dev: {
      tasks: ['watch:sass', 'watch:html', 'watch:static', 'webpack:watch', 'run:image', 'copy:dev'],
      options: {
        logConcurrentOutput: true,
      },
    },
  });
};
