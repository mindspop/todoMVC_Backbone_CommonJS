var Backbone = require('backbone');
var $ = require('jquery');
var itemTpl = require('../../template/item-tpl.ejs');

var TodoView = Backbone.View.extend({
	tagName : 'li',
	template: itemTpl,
	events  : {
		'click .toggle' : 'toggleCompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
		'keypress .edit': 'updateOnEnter',
		'keydown .edit' : 'revertOnEscape',
		'blur .edit'    : 'close'
	},

	initialize: function () {
		this.listenTo(this.model, {
			'change' : this.render,
			'destroy': this.remove,
			'visible': this.toggleVisible
		});

		this.render();
	},

	render       : function () {
		if (this.model.changed.id !== undefined) {
			return;
		}
		var tmpl = this.template(this.model.toJSON());
		this.$el.html(tmpl);
		this.$el.toggleClass('completed', this.model.get('completed'));
		this.toggleVisible();
		this.$input = this.$('.edit');
		return this;
	},

	// 根据当前列表类型判断是否需要显示 todo-item
	toggleVisible: function () {
		this.$el.toggleClass('hidden', this._isHidden());
	},

	_isHidden      : function () {
		return this.model.get('completed') ? app.TODO_FILTER == 'active' : app.TODO_FILTER == 'completed';
	},

	// 改变 Model complete 状态
	toggleCompleted: function () {
		this.model.toggleCompleted();
	},

	clear         : function () {
		this.model.destroy();
	},

	// 进入编辑状态
	edit          : function () {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	// 更新 todo-item 信息
	updateOnEnter : function (e) {
		var value = this.$input.val();
		var trimmedValue = $.trim(value);
		if (e.which === ENTER_KEY) {
			if (trimmedValue) {
				this.model.save({
					title: trimmedValue
				});
				value !== trimmedValue ? this.model.trigger('change') : '';
			} else {
				this.clear();
			}

			this.close();
		}
	},

	// 退出编辑状态
	revertOnEscape: function (e) {
		if (e.which === ESC_KEY) {
			this.$el.val(this.model.get('title'));
			this.close();
		}
	},

	close: function () {
		this.$el.removeClass('editing');
	}
});

module.exports = TodoView;