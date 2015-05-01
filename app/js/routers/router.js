var Backbone = require('backbone');

var TodoRouter = Backbone.Router.extend({
	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function (param) {
		app.TODO_FILTER = param || '';

		// 当 hash 改变时，触发 filter 事件，以便 footer 和 todoList 视图
		// 响应不同过滤状态
		app.todos.trigger('filter', param);
	}
});

module.exports = TodoRouter;