// 引入 gulp
var gulp = require('gulp');

// 引入组件
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require("./webpack.config.js");

// 配置 Gulp 默认执行任务
gulp.task('default', ['webpack-dev-server',
                      "build-dev"]);

// 配置上线环境下的打包任务
gulp.task("build", ["webpack:build"]);
gulp.task("webpack:build", function (callback) {

	// 修改基础配置项
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(new webpack.optimize.UglifyJsPlugin());

	// 启动 webpack 打包
	webpack(myConfig, function (err, stats) {
		if (err) {
			throw new gutil.PluginError("webpack:build", err);
		}
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

// 配置开发环境下打包任务
gulp.task("build-dev", function () {
	gulp.watch(["./app/**/*"], ["webpack:build-dev"]);
});

// 修改基础配置项
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// 启动 webpack 打包
var devCompliler = webpack(myDevConfig);
gulp.task('webpack:build-dev', function () {

	devCompliler.run(function (err, stats) {
		if (err) {
			throw new gutil.PluginError('webpack:build-dev', err);
		}
		gutil.log('[webpack:build-dev]', stats.toString({
			colors: true
		}));
	});
});

// 配置 server
gulp.task('webpack-dev-server', function () {

	// 修改 webpack 配置项
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = 'eval';
	myConfig.debug = true;

	// 启动 webpack server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: '/' + myConfig.output.publicPath,
		hot       : true,
		stats     : {
			colors: true
		}
	}).listen(80, 'localhost', function (err) {
				if (err) {
					throw new gutil.PluginError('webpack-dev-server', err);
				}
				gutil.log('[webpack-dev-server]', 'http://localhost/webpack-dev-server/index.html');
			});
});

