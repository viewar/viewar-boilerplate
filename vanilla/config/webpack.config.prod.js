const webpack = require('webpack')
const path = require('path')
const { srcPath, modulePath } = require('./paths')

module.exports = {
  entry: {
    polyfills: [path.join(srcPath, 'polyfills.js')],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: srcPath,
        exclude: modulePath,

        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              'env',
              'stage-0',
            ],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}
