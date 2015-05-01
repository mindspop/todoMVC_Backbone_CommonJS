var Backbone = require('backbone');

var TodoModel = Backbone.Model.extend({

	// 设置默认属性值
	defaults       : {
		title    : '',
		completed: false
	},

	// 修改 Completed 状态
	toggleCompleted: function () {
		this.save({
			completed: !this.get('completed')
		})
	}
});

module.exports = TodoModel;