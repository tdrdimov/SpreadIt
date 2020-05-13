const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: /node_modules/
  },
  entry: {
    app: './src/main.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: '../public'
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'app.js'
  },
  resolve: {
    // with these, we can successfully remove .vue from vue imports.
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.txt$/, use: 'raw-loader'
      },
      {
        test: /(\.css$)/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
