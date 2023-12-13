module.exports = (grunt) => {
  grunt.config.set('clean', {
    dist: {
      dot: true,
      src: ['<%= config.dist %>', '<%= config.root %>/.grunt'],
    },
  });
};
