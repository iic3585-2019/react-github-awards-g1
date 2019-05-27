const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  entry: {
    app: path.resolve(__dirname, 'src', 'index.jsx')
  },
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: `http://${process.env['IP'] || '0.0.0.0'}:8080/`,
    globalObject: 'this'
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 8080,
    headers: {'Access-Control-Allow-Origin': 'http://0.0.0.0:8080'}
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })]
};
