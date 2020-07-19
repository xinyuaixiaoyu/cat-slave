const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleWebpackPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    port: 8000,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      },
      inject: true,
    }),
    new StyleWebpackPlugin({
      context: 'src',
      configFile: path.resolve(__dirname, './.stylelintrc.js'),
      files: '**/*.less',
      failOnError: false,
      quiet: true,
      syntax: 'less',
    }),
  ],
};
