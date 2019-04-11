// https://meetup.toast.com/posts/153

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (_, options) => {
  const config = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: ''
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            plugins: [
              'react-hot-loader/babel',
              '@babel/transform-runtime'
            ]
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader?sourceMap'],
        }
      ]
    },
  }

  if (options.mode === 'development') {
    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'Development',
        showErrors: true,
        template: './src/index.html',
        filename: './index.html'
      }),
    ];

    config.devtool = 'source-map';

    config.devServer = {
      headers: 
        { 'Access-Control-Allow-Origin': '*' },
      // inline: true,
      disableHostCheck: true,
      hot: true,
      filename: 'bundle.js',
      contentBase: path.resolve(__dirname, 'src'),
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    };
  } else {
    config.plugins = [
      new CleanWebpackPlugin(['dist'])
    ];
  }

  return config;
}
