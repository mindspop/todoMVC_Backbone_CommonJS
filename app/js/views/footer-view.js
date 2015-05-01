var Backbone = require('backbone');
var _ = require('underscore');
var footerTpl = require('../../template/footer-tpl.ejs');

var FooterView = Backbone.View.extend({
	template: footerTpl,
	events  : {
		'click #clear-completed': 'clearCompleted'
	},

	initialize: function () {
		this.listenTo(this.collection, 'add remove reset change:completed', this.render);
		this.listenTo(this.collection, 'filter', this.setSelectedTab);
	},

	render        : function () {

		// 提取当前所绑定的 collection 数据的状态
		var remaining = this.collection.where({
			completed: false
		}).length;
		var completed = this.collection.where({
			completed: true
		}).length;

		// 利用获取的 collection 数据渲染模板
		var footerView = this.template({
			remaining: remaining,
			completed: completed
		});
		this.$el.html(footerView);

		this.setSelectedTab(app.TODO_FILTER);
	},

	// 设置标签选中状态
	setSelectedTab: function (todo_filter) {
		this.$('#filters li a').removeClass('selected').filter('[href="#/' + (todo_filter || '') + '"]').addClass('selected');
	},

	// 清除已经完成的 todoitem
	clearCompleted: function () {
		_.invoke(this.collection.completed(), 'destroy');
	}
});

module.exports = FooterView;