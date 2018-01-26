const webpack = require('webpack')
const ConcatPlugin = require('webpack-concat-plugin')

module.exports = {
  plugins: [
    new ConcatPlugin({
      fileName: 'viewar-core.js',
      filesToConcat: ['viewar-core'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ]
}
