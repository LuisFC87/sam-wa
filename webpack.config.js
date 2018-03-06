
/****************************************************************************************

	Copyright (c) 2018, SAM.
	Author: Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

var path = require('path');
var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/****************************************************************************************/

var serverConfig = {
	node: {
		__filename: true,
		__dirname: false
	},
	target: 'node',
	externals: [nodeExternals()],

	entry: {
		'index.js': './src/server/index.js',
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name]'
	},

	module: {
		rules: [
			{
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},

	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/server/config.json', to: 'config.json' },
		])
	]
};

/****************************************************************************************/

var clientConfig = {
	target: 'web',

	resolve: {
		alias: {
			'react': 'react-lite',
			'react-dom': 'react-lite'
		}
	},

	entry: {
		'sam.main': './src/client/app/main.jsx'
	},

	output: {
		path: path.join(__dirname, 'dist', 'assets'),
		filename: 'js/[name].min.js'
	},

	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({filename: 'css/sam.min.css'}),
		new CopyWebpackPlugin([
			{ from: './resources/icons', to: 'icons' }
		])
	]
};

/****************************************************************************************/

module.exports = [serverConfig, clientConfig];
