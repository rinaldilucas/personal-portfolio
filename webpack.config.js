const dotenv = require('dotenv');
const mode = process.env.NODE_ENV || 'development';

('use strict');
dotenv.config();

const buildWebpackConfig = () => {
  const path = require('path');
  const webpack = require('webpack');

  const resolve = {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@app': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@scripts': path.resolve(__dirname, './src/scripts'),
    },
  };

  const plugins = [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env.CAPTCHA_SECRET': JSON.stringify(process.env.CAPTCHA_SECRET),
      'process.env.GETFORM_API_KEY': JSON.stringify(process.env.GETFORM_API_KEY),
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
        helperDirs: [path.resolve(__dirname, './src/scripts/helpers')],
        partialDirs: [path.resolve(__dirname, './src/pages'), path.resolve(__dirname, './src/components')],
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
    entry: { main: path.resolve(__dirname, './src/scripts/main.ts') },
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
