module.exports = (grunt) => {
    grunt.config.set('realFavicon', {
        dist: {
            src: '<%= config.source %>/images/_favicon/favicon.png',
            dest: '<%= config.dist %>',
            options: {
                iconsPath: '/',
                html: ['<%= config.dist %>/**/*.html'],
                design: {
                    ios: {
                        pictureAspect: 'noChange',
                        assets: {
                            ios6AndPriorIcons: false,
                            ios7AndLaterIcons: false,
                            precomposedIcons: false,
                            declareOnlyDefaultIcon: true,
                        },
                    },
                    desktopBrowser: {
                        design: 'raw',
                    },
                    windows: {
                        pictureAspect: 'noChange',
                        backgroundColor: '#fff',
                        onConflict: 'override',
                        assets: {
                            windows80Ie10Tile: false,
                            windows10Ie11EdgeTiles: {
                                small: false,
                                medium: true,
                                big: false,
                                rectangle: false,
                            },
                        },
                    },
                    androidChrome: {
                        pictureAspect: 'noChange',
                        themeColor: '#f6f6f6',
                        manifest: {
                            display: 'standalone',
                            orientation: 'notSet',
                            onConflict: 'override',
                            declared: true,
                        },
                        assets: {
                            legacyIcon: false,
                            lowResolutionIcons: false,
                        },
                    },
                },
                settings: {
                    scalingAlgorithm: 'Mitchell',
                    errorOnImageTooSmall: false,
                    readmeFile: false,
                    htmlCodeFile: false,
                    usePathAsIs: false,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-real-favicon');
};
