// https://meetup.toast.com/posts/153
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const config = {
    entry: {
      app: ['./src/index.js']
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }]
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
        template: path.join(__dirname, './src/index.html'),
      }),
      new CopyWebpackPlugin([
        { from: './src/asset/', to: './asset'}
      ])
    ];

    config.devtool = 'inline-source-map';

    config.devServer = {
      hot: true,
      contentBase: path.resolve(__dirname, 'src'),
      stats: {
        color: true
      }
    };
  } else {
    config.plugins = [
      new CleanWebpackPlugin(['dist'])
    ];
  }

  return config;
}