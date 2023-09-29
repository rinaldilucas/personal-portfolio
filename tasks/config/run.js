module.exports = (grunt) => {
  grunt.config.set('run', {
    image: {
      exec: 'npm run sync'
    },
  });
};
