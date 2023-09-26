module.exports = (grunt) => {
  grunt.config.set('copy', {
    dist: {
      files: [
        // root files
        {
          expand: true,
          cwd: '<%= config.root %>',
          dest: '<%= config.dist %>',
          src: [
            'CNAME', //
          ],
        },
        // thumb
        {
          expand: true,
          cwd: '<%= config.source %>/images/_favicon',
          dest: '<%= config.dist %>',
          src: 'thumb.jpg',
        },
        // fonts
        {
          expand: true,
          dot: true,
          cwd: '<%= config.source %>/fonts',
          dest: '<%= config.dist %>/assets/fonts',
          src: '**/*.{eot,svg,ttf,woff,woff2}',
        },
        // images
        {
          expand: true,
          cwd: '<%= config.temp %>/images',
          dest: '<%= config.dist %>/assets/images',
          src: '**/*.{ico,png,jpg,jpeg,svg,gif,png.webp,jpg.webp,jpeg.webp,svg.webp,webp}',
        },
        // ignored images
        {
          expand: true,
          cwd: '<%= config.source %>/images/examples',
          dest: '<%= config.dist %>/assets/images/examples',
          src: '**/*.{ico,png,jpg,jpeg,svg,gif,png.webp,jpg.webp,jpeg.webp,svg.webp,webp}',
        },
        // videos
        {
          expand: true,
          cwd: '<%= config.source %>/videos',
          dest: '<%= config.dist %>/assets/videos',
          src: '**/*.{mp4,avi,ogg,ogv,webm}',
        },
        // data
        {
          expand: true,
          cwd: '<%= config.source %>/static/',
          dest: '<%= config.dist %>/assets/files',
          src: '**',
        },
      ],
    },
    dev: {
      files: [
        // root files
        {
          expand: true,
          cwd: '<%= config.root %>',
          dest: '<%= config.develop %>',
          src: [
            // 'CNAME', //
          ],
        },
        // works
        {
          expand: true,
          cwd: '<%= config.source %>/pages',
          dest: '<%= config.develop %>',
          src: '**.html',
        },
        // fonts
        {
          expand: true,
          dot: true,
          cwd: '<%= config.source %>/fonts',
          dest: '<%= config.develop %>/assets/fonts',
          src: '**/*.{eot,svg,ttf,woff,woff2}',
        },
        // videos
        {
          expand: true,
          cwd: '<%= config.source %>/videos',
          dest: '<%= config.develop %>/assets/videos',
          src: '**/*.{mp4,avi,ogg,ogv,webm}',
        },
        // data
        {
          expand: true,
          cwd: '<%= config.source %>/static/',
          dest: '<%= config.develop %>/assets/files',
          src: '**',
        },
      ],
    },
  });
};
