module.exports = (grunt) => {
  const env = require('../env');
  const hb = require('gulp-hb');
  const path = require('path');
  const rename = require('gulp-rename');
  const vinylFs = require('vinyl-fs');
  const defaults = require('../../src/assets/data/database.json');

  const compileHandlebarsLayout = () => {
    grunt.registerMultiTask('hb', 'Renders Handlebars templates to static HTML.', function () {
      let done;
      const options = this.options();
      const files = this.files;
      let count = files.length;

      const fail = (error) => {
        grunt.log.error(error);
        done(false);
      };

      const success = () => {
        if (--count === 0) done(true);
      };

      const process = (file) => {
        const dest = file.dest;
        const dirname = path.dirname(dest);
        const basename = path.basename(dest);

        vinylFs
          .src(file.src)
          .pipe(
            hb(options)
              .helpers(require('handlebars-layouts'))
              .data(options.more || {})
              .data(defaults),
          )
          .pipe(rename(basename))
          .pipe(vinylFs.dest(dirname))
          .on('error', fail)
          .on('finish', success);
      };

      if (count) {
        done = this.async();
        files.forEach(process);
      }
    });
  };

  compileHandlebarsLayout(grunt, grunt.option('lang'));

  grunt.config.set('hb', {
    options: {
      data: ['src/scripts/data/**/*.json'],
      helpers: ['src/scripts/helpers/*.js'],
      partials: ['src/templates/**/*.hbs'],
    },
    watch: {
      options: {
        more: {
          layout: 'layouts/skel',
          cdn_url: './',
        },
      },
      files: [
        {
          expand: true,
          cwd: '<%= config.source %>/pages/',
          src: '**/*.hbs',
          dest: '<%= config.develop %>/',
          ext: '.html',
        },
      ],
    },
    dist: {
      options: {
        bustCache: true,
        more: {
          full: grunt.option('hml') ? env().url.hml : env().url.prod,
          layout: 'layouts/skel',
          version: '1.0.0',
          cdn_url: './',
          date: ((date) => {
            return [date.getFullYear(), (date.getMonth() + 1 + '').padStart(2, '0'), date.getDate()].join('-');
          })(new Date()),
        },
      },
      files: [
        {
          expand: true,
          cwd: '<%= config.source %>/pages/',
          src: '**/*.hbs',
          dest: '<%= config.dist %>',
          ext: '.html',
        },
      ],
    },
  });
};
