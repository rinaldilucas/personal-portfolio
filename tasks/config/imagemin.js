module.exports = (grunt) => {
  const webp = require('imagemin-webp');

  grunt.config.set('imagemin', {
    webp: {
      options: {
        use: [webp()]
      },
      files: [{
          expand: true,
          cwd: '<%= config.source %>/assets/images',
          src: '**/*.{png,jpg,jpeg}',
          dest: '<%= config.temp %>/images',
          rename: (dest, src) => {
            return dest + '/' + src + '.webp';
          },
        },
        {
          expand: true,
          cwd: '<%= config.source %>/assets/images',
          src: '**/*.{svg,gif,ico}',
          dest: '<%= config.temp %>/images',
        },
      ],
    },
  });
};
