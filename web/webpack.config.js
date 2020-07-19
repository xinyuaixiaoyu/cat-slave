const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
console.log(isDev);

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'react-css-modules',
                  {
                    generateScopedName:
                      '[path][name]__[local]--[hash:base64:5]',
                    filetypes: {
                      '.less': {
                        syntax: 'postcss-less',
                      },
                    },
                  },
                ],
              ],
            },
          },
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  // devtool: 'cheap-module-source-map',
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
  ],
};
