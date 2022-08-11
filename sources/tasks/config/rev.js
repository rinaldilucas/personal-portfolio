module.exports = (grunt) => {
    grunt.config.set('rev', {
        options: {
            encoding: 'utf8',
            algorithm: 'md5',
            length: 8,
        },
        files: [
            // '<%= config.dist %>/assets/images/**/*.{png,jpg,gif,webp,ico}', //
            '<%= config.dist %>/assets/scripts/*.js',
            '<%= config.dist %>/assets/styles/*.css',
        ],
    });
};
