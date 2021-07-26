/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const PostCSSPresetEnv = require('postcss-preset-env');
const common = require('./webpack.common.config.js');

const SERVER_HOST = 'localhost';
const SERVER_PORT = '666';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer, PostCSSPresetEnv()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: true,
    https: false,
    noInfo: true
  }
});
