const env = require('../env');

module.exports = (grunt) => {
  const url = require('url');
  const proxy = require('proxy-middleware');
  const proxyOptions = url.parse(env().base + 'oauth');
  proxyOptions.route = '/oauth';

  grunt.config.set('browserSync', {
    dev: {
      bsFiles: {
        src: ['develop/assets/styles/*.css', 'develop/assets/scripts/*.js', 'develop/*.html', 'src/assets/images/*.**'],
      },
      options: {
        watchTask: true,
        server: '<%= config.develop %>',
        https: false,
        middleware: [proxy(proxyOptions)],
      },
    },
  });
};
