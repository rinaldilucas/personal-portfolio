module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean:dist',
    'webpack:build',
    'uglify',
    'sass:dist',
    'cssmin',
    'autoprefixer:dist',
    'tinypng',
    'imagemin:webp',
    'copy:dist',
    'hb:dist',
    'useminPrepare',
    'rev',
    'usemin',
    'htmlmin',
    'realFavicon',
  ]);
};
