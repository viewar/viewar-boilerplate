const webpack = require('webpack')
const ip = require('ip').address()
const { srcPath, modulePath } = require('./paths')

module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    public: ip ? `${ip}:${process.env.PORT || '8080'}` : undefined,
    host: process.env.HOST || '0.0.0.0', // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
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
              'react',
            ],
            cacheDirectory: true,
          },
        },
      },
    ]
  },
  output: {
    devtoolModuleFilenameTemplate: 'source:///[absolute-resource-path]',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
}
