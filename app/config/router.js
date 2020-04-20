/*
  api
  https://developers.weixin.qq.com/miniprogram/dev/api/ui-navigate.html#wxnavigatetoobject

  url 页面路由
  method 跳转方式
  isLogin 是否需要登录
  event 后退时需要触发的事件
*/

const router = {
  //首页
  index: {
    url: '/pages/index/index',
    method: 'switchTab',
  },
  //城市
  city: {
    url: '/pages/index/city',
    method: 'navigateTo',
  },
  //搜索
  search: {
    url: '/pages/search/index',
    method: 'navigateTo',
  },
  //搜索结果
  toground: {
    url: '/pages/search/toground',
    method: 'navigateTo',
  },
};

module.exports = router;