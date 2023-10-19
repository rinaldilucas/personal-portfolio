const env = require('./tasks/env');

('use strict');

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  let includeAll;

  try {
    includeAll = require('include-all');
    grunt.initConfig({
      config: env(),
    });
  } catch (e0) {
    try {
      includeAll = require('sails/node_modules/include-all');
    } catch (e1) {
      console.error('To fix this, please run: yarn add include-all --save`');

      grunt.registerTask('default', []);
      return;
    }
  }

  var loadTasks = function(relPath) {
    return (
      includeAll({
        dirname: require('path').resolve(__dirname, relPath),
        filter: /(.+)\.js$/,
        excludeDirs: /^\.(git|svn)$/,
      }) || {}
    );
  };

  var invokeConfigFn = function(tasks) {
    for (const taskName in tasks) {
      if (tasks.hasOwnProperty(taskName)) {
        tasks[taskName](grunt);
      }
    }
  };

  const taskConfigurations = loadTasks('./tasks/config');
  const registerDefinitions = loadTasks('./tasks/register');

  if (!registerDefinitions.default) {
    registerDefinitions.default = function(grunt) {
      grunt.registerTask('default', []);
    };
  }

  invokeConfigFn(taskConfigurations);
  invokeConfigFn(registerDefinitions);
};
