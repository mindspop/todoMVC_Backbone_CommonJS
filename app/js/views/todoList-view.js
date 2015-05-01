var Backbone = require('backbone');
var TodoView = require('./todo-view.js');

var TodoListView = Backbone.View.extend({
	tagName   : 'ul',
	initialize: function () {
		this.listenTo(this.collection, {
			'add'             : this.addOne,
			'reset'           : this.addAll,
			'change:completed': this.filterOne,
			'filter'          : this.filterAll,
			'destroy'         : this.render
		});
	},

	render: function () {

	},

	addOne: function (todo) {
		var view = new TodoView({
			model: todo
		});
		this.$el.append(view.el);
	},

	addAll: function () {
		this.$el.html('');
		this.collection.each(this.addOne, this);
	},

	filterOne: function (todo) {
		todo.trigger('visible');
	},

	filterAll: function () {
		this.collection.each(this.filterOne, this);
	}
});

module.exports = TodoListView;