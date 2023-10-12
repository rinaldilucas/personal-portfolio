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
          cwd: '<%= config.root %>/assets/images/_favicon',
          dest: '<%= config.dist %>',
          src: 'thumb.jpg',
        },
        // fonts
        {
          expand: true,
          dot: true,
          cwd: '<%= config.root %>/assets/fonts',
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
        // videos
        {
          expand: true,
          cwd: '<%= config.root %>/assets/videos',
          dest: '<%= config.dist %>/assets/videos',
          src: '**/*.{mp4,avi,ogg,ogv,webm}',
        },
        // data
        {
          expand: true,
          cwd: '<%= config.root %>/assets/static',
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
          cwd: '<%= config.source %>/pagesxxx',
          dest: '<%= config.develop %>',
          src: '**.html',
        },
        // fonts
        {
          expand: true,
          dot: true,
          cwd: '<%= config.root %>/assets/fonts',
          dest: '<%= config.develop %>/assets/fonts',
          src: '**/*.{eot,svg,ttf,woff,woff2}',
        },
        // videos
        {
          expand: true,
          cwd: '<%= config.root %>/assets/videos',
          dest: '<%= config.develop %>/assets/videos',
          src: '**/*.{mp4,avi,ogg,ogv,webm}',
        },
        // data
        {
          expand: true,
          cwd: '<%= config.root %>/assets/static',
          dest: '<%= config.develop %>/assets/files',
          src: '**',
        },
      ],
    },
  });
};
