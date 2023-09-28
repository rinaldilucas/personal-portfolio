module.exports = (grunt) => {
  const env = require('../env');
  const webpackConfig = require('../../webpack.config.js');

  grunt.config.set('webpack', {
    options: webpackConfig,
    build: {
      mode: 'production',
      output: {
        path: require('path').resolve(__dirname, '../../../' + env().dist + '/assets'),
        environment: {
          arrowFunction: false,
          bigIntLiteral: false,
          const: false,
          destructuring: false,
          dynamicImport: false,
          forOf: true,
          module: false,
          optionalChaining: true,
          templateLiteral: true,
        },
      },
    },
    watch: {
      progress: true,
      failOnError: false,
      watch: true,
      keepalive: true,
      devtool: 'source-map',
    },
  });
};
