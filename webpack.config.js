var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var libraryName = 'lazer';

var PATHS = {
	app: path.resolve(__dirname, 'src'),
	build: path.resolve(__dirname, './')
}

var outputFile = libraryName + '.js';

var config = {
	devtool: 'inline-source-map',
	entry: {
			meta: './src/',
			cache: './src/cache',
			canvas: './src/canvas',	
			components: './src/components',
			config: './src/config',
			create: './src/create',
			device: './src/device',
			dom: './src/dom',
			fx: './src/fx',
			game: './src/game',
			geom: './src/geom',
			graphics: './src/graphics',
			input: './src/input',
			loader: './src/loader',
			math:'./src/math',
			// renderers: './src/renderers',
			// sound: './src/sound',
			// state: './src/state',
			system: './src/system',
			// texture: './src/texture',
			// time: './src/time',
			utils: './src/utils'
			// webgl: './src/webgl'
	},
	output: {
		path: PATHS.build,
		filename: '[name].js',
		library: [libraryName, '[name]'],
		libraryTarget: 'umd',
		umdNamedDefine: true
  	},
  	module: {
	  	loaders: [
		  	{
		  		test: /\.js$/,
					loader: 'babel',
					include: PATHS.app,
					exclude: /node_modules/
			},
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				include: PATHS.app,
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		root: path.resolve('./src'),
		extensions: ['', '.js']
	},
	plugins: [
		new CleanWebpackPlugin('build', {
				root: __dirname,
				verbose: true,
				dry: false
			}),
		new UglifyJsPlugin({ 
			minimize: true 
		}),
		new webpack.IgnorePlugin(new RegExp(/\_spec$/))

	]
};

module.exports = config;
