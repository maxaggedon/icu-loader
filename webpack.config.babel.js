const libName = 'icu-loader'

export default {
  entry: `${__dirname}/src/index.js`,
  devtool: process.env.WEBPACK_ENV === 'production' ? 'source-map' : 'inline-source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: `${libName}.js`,
    library: libName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|flow-typed|__tests__)/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  stats: {
    colors: true
  }
}
