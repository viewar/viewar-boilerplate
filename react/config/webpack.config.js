const webpack = require('webpack')
const mergeConfig = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { srcPath, buildPath } = require('./paths')

const prodConfig = require('./webpack.config.prod')
const devConfig = require('./webpack.config.dev')
const devCoreConfig = require('./webpack.config.core')
const devMockConfig = require('./webpack.config.mock')

const baseConfig = {
  output: {
    path: buildPath,
    filename: '[name].js',
  },
  entry: {
    polyfills: ['babel-polyfill'],
    index: [path.join(srcPath, 'index.js')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ViewAR SDK App',
      template: path.join(srcPath, 'index.html'),
      inject: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(eot|ttf|otf|woff2?)(\?v=\d+\.\d+\.\d+)?|png|jpe?g|svg|gif|ico$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1, modules: true, localIdentName: '[name]-[local]'}},
        ],
      },
    ],
  },
}

module.exports = (env) => {
  process.env.BABEL_ENV = env

  switch (env) {
    case 'prod':
      return mergeConfig(baseConfig, prodConfig)
    case 'dev-core':
      return mergeConfig(baseConfig, devConfig, devCoreConfig)
    case 'dev-mock':
      return mergeConfig(baseConfig, devConfig, devMockConfig)
    default:
      throw new Error(`ViewAR boilerplate: Error! Unrecognized mode "${env}"!`)
  }
}