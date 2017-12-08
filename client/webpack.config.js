module.exports = {
  entry: './src/js/client.js',
  output: {
    filename: 'client.min.js',
    path: __dirname + '/src/',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false
      }
    }
  }
}
