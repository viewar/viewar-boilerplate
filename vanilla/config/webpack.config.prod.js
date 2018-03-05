const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MinifyPlugin(),
  ],
}
