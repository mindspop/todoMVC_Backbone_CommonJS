# todoMVC_Backbone_CommonJS
> 前提说明：本篇是在学习`Backbone`的时候，实战练习写了一个 TodoMVC，并在原有代码上基础做了部分改进工作。

## 主要的改进
* 引入模块开发并使用`CommonJS`规范
* 使用`Webpack`工具加载和打包模块
* 将 HTML 模板独立成单一模块文件，同时让模块 JS 文件加载对应的 HTML 模板文件
* 细化了`View`层的颗粒度，将 View 拆解成：AppView、FooterView、TodoView、TodoListView
* 优化了 View 中`render`方法监听的事件类型，防止当`Model`或`Collection`发生一次变化时，View 多次重复渲染。「原例子中简单监听了`all`事件」