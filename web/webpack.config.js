const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
				test: /\.js|jsx$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
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
								[
									'import',
									{
										libraryName: 'antd',
										libraryDirectory: 'es',
										style: true,
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
				test: /\.(css|less)$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[path][name]__[local]--[hash:base64:5]',
							},
							importLoaders: 1,
						},
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true,
								importLoaders: 2,
							},
						},
					},
				],
			},
			{
				test: /\.(css|less)$/,
				include: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true,
								importLoaders: 2,
							},
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif|ttf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							outputPath: './assets/',
						},
					},
				],
			},
		],
	},
	devtool: 'cheap-module-source-map',
	devServer: {
		open: true,
		port: 8000,
		hot: true,
		historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'http://localhost:5050',
				changeOrigin: true,
				pathRewrite: { api: '/' },
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'),
		},
		extensions: ['.js', '.jsx', '.less', '.css'],
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
