/**
 * Created by mindspop on 4/18/15.
 */

var path = require('path');
var webpack = require('webpack');

var config = {
	entry: {
		app: ['webpack/hot/dev-server',
		      path.resolve(__dirname, './app/js/app.js')],

		vender: ['jquery',
		         'backbone',
		         'backbone.localstorage',
		         'underscore']
	},

	output: {
		path      : path.resolve(__dirname, 'app/bulid'),
		filename  : 'bundle-[name].js',
		publicPath: 'assets'
	},

	module: {
		loaders: [{
			          test  : /\.ejs$/,
			          loader: 'ejs-loader'
		          }]
	},

	plugins: [new webpack.optimize.CommonsChunkPlugin('vender', 'vender.js'),
	          new webpack.HotModuleReplacementPlugin(),
	          new webpack.NoErrorsPlugin(),
	          new webpack.ProvidePlugin({
		          _: "underscore"
	          })]
};

module.exports = config;