(function (global) {
	var app = app || {};
	global.ENTER_KEY = 13;
	global.ESC_KEY = 27;
	global.app = app;

	var AppView = require('./views/app-view.js');
	var TodoRouter = require('./routers/router.js');
	var Backbone = require('backbone');

	// 初始化应用程序入口
	var appView = new AppView();

	// 开启 Router 监听
	app.todoRouter = new TodoRouter();
	Backbone.history.start();

})(window);

