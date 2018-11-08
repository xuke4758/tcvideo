> 微信小程序api
- https://developers.weixin.qq.com/miniprogram/dev/api/

> 结构说明
- pages业务
- utils工具
	router	跳路由统一使用 封装了wx.navigateTo wx.redirectTo wx.switchTab
	request http代理 封装了wx.request
- libs 第三方工具 （多状态管理mobox）
- config配置文件
- service服务接口方法
- public静态资源文件夹
	例如：

> 开发注意事项
- 由于小程序层级问题 跳转页面统一使用utils／route.js模块 
- service处理 统一调用处理api 相对于controller
- 组件开发 子组件禁用ready方法获取缓存对象，用properties从父组件传值



