var Backbone = require('backbone');
var TodoListView = require('./todoList-view.js');
var TodosCollection = require('../collections/todos.js');
var FooterView = require('./footer-view.js');
var _ = require('underscore');

app.todos = new TodosCollection;

var AppView = Backbone.View.extend({
	el    : '#todoapp',
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #toggle-all' : 'toggleAllComplete'
	},

	initialize: function () {

		// 缓存 app 内的 DOM 节点
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');
		this.$list = this.$('#todo-list');

		this.listenTo(app.todos, 'add reset remove', this.render);
		this.listenTo(app.todos, 'change:completed', this.toggleCheck);

		// 新建 footer 视图
		app.footerView = new FooterView({
			collection: app.todos
		});

		// 新建 todolist 视图
		app.todoListView = new TodoListView({
			collection: app.todos
		});

		// 初始化提取本地历史数据，同时触发 reset 事件
		app.todos.fetch({
			reset: true
		});
	},

	render           : function () {
		this.renderMain();
		this.renderFooter();
	},

	//渲染 main 部分视图
	renderMain       : function () {
		if (app.todos.length) {
			this.$list.append(app.todoListView.el);
			this.$main.show();

			// 设置批量操作按钮显示状态
			this.toggleCheck();
		} else {
			this.$main.hide();
		}
	},

	// 渲染 footer 部分视图
	renderFooter     : function () {
		if (app.todos.length) {
			this.$footer.append(app.footerView.el);
			this.$footer.show();
		} else {
			this.$footer.hide();
		}
	},

	// 在输入框中按回车创建一条新 todoitem
	createOnEnter    : function (e) {
		var title = this.$input.val().trim();
		if (e.which === ENTER_KEY && title) {
			app.todos.create(this.newTodoAttrs(title));
			this.$input.val('');
		}
	},

	// 根据 title 创建一份新的 item 数据以供生成新的 todoitem
	newTodoAttrs     : function (title) {
		return {
			title    : title,
			order    : app.todos.nextOrder(),
			completed: false
		};
	},

	// 完成或未完成所有 todoitems
	toggleAllComplete: function () {
		var completed = this.allCheckbox.checked;
		_.invoke(app.todos.where({
			completed: !completed
		}), 'save', {
			completed: completed
		});
	},

	toggleCheck: function () {
		var remaining = app.todos.where({
			completed: false
		}).length;
		this.allCheckbox.checked = !remaining;
	}
});

module.exports = AppView;