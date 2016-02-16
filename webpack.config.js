'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')	
};

const common  = {
	// Entry accepts a path or an object of entries. We'll be using the
	// latter form given it's convenient with more complex configurations.
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				//Test uses regex: this says ends in .css $ means 'end of string'
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: PATHS.app
			}
		]
	}
};

//DEfault Configuration
if(TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devServer: {
			//Set where we will serve files from...
			contentBase: PATHS.build,

			// Enable history API fallback so HTML5 History API based
			// routing works. This is a good default that will come
			// in handy in more complicated setups.
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			
			// Display only errors to reduce the amount of output.
			//stats: 'errors-only',
			
			// Parse host and port from env so this is easy to customize.
			//
			// If you use Vagrant or Cloud9, set
			// host: process.env.HOST || '0.0.0.0';
			
			// 0.0.0.0 is available to all network devices unlike default
			// localhost
			host: process.env.HOST || '0.0.0.0',
			port: process.env.PORT
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	});
}

if(TARGET === 'build') {
	module.exports = merge(common, {});
}
