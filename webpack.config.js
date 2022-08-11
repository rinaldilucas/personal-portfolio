const mode = process.env.NODE_ENV || 'development';

('use scrict');

const buildWebpackConfig = () => {
    const path = require('path');
    const webpack = require('webpack');

    const resolve = {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            data: path.resolve(__dirname, './sources/scripts/data'),
            main: path.resolve(__dirname, './sources/scripts/main'),
            views: path.resolve(__dirname, './sources/scripts/views'),
            app: path.resolve(__dirname, './sources/scripts/app'),
            scope: path.resolve(__dirname, './sources/scripts/scope'),
            templates: path.resolve(__dirname, './sources/templates'),
        },
    };

    const plugins = [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ];

    const rules = [
        {
            test: /\.ts$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'ts-loader',
            },
        },
        {
            test: /\.hbs$/,
            exclude: /(node_modules)/,
            loader: 'handlebars-loader',
            options: {
                helperDirs: [path.resolve(__dirname, './sources/scripts/helpers')],
                partialDirs: [path.resolve(__dirname, './sources/templates')],
            },
        },
    ];

    const performance = {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    };

    const config = {
        cache: true,
        module: { rules },
        entry: { main: path.resolve(__dirname, './sources/scripts/main.ts') },
        output: {
            path: path.resolve(__dirname, './develop/assets'),
            filename: 'scripts/[name].js',
        },
        mode,
        resolve,
        plugins,
        performance,
    };

    return config;
};

module.exports = buildWebpackConfig;
