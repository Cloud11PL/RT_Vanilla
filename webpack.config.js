const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: './dist'
  },
  entry: {
    home: './src/home/home.js',
    about: './src/about/about.js',
    contact: './src/contact/contact.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Swapi - index',
      template: __dirname + "/src/home/home.html",
      inject: 'body',
      chunks: ['home'],
      filename: './index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Swapi - about',
      template: __dirname + "/src/about/about.html",
      inject: 'body',
      chunks: ['about'],
      filename: './about.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Swapi - contact',      
      template: __dirname + "/src/contact/contact.html",
      inject: 'body',
      chunks: ['contact'],
      filename: './contact.html'
    }),
  ],
  devServer: {
    contentBase: './src/public',
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use:  {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader','css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  }
};