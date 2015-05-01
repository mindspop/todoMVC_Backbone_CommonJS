var Backbone = require('backbone');
Backbone.localStorage = require('backbone.localstorage');
var TodoModel = require('../models/todo.js');

var TodosCollection = Backbone.Collection.extend({
	model       : TodoModel,
	localStorage: new Backbone.LocalStorage('todos-backbone'),
	comparator  : 'order',

	// 过滤剩余的 todo-items
	remaining   : function () {
		return this.where({
			completed: false
		});
	},

	// 过滤完成的 todo-items
	completed   : function () {
		return this.where({
			completed: true
		});
	},

	// 获取排序编号
	nextOrder   : function () {
		return this.length ? this.last().get('order') + 1 : 1;
	}
});

module.exports = TodosCollection;