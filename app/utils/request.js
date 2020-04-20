// api
// https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html

// const base = require('../config/base');
import config from "../config/config"
import router from "../utils/router"

let requestQueue = []; // 等待中的请求
let requestArr = []; // 进行中的请求
const maxRequestCount = 10; // 一个微信小程序，同时只能有10个网络请求连接。

/**
 * @param {Object} options 参数与微信小程序wx.request相同

  data 数据说明：
  最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：
  对于 GET 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
  对于 POST 方法且 header['content-type'] 为 application/json 的数据，会对数据进行 JSON 序列化
  对于 POST 方法且 header['content-type'] 为 application/x-www-form-urlencoded 的数据，会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）

 以下为自定义参数
 * @param {Boolean} options.showLoading 请求时是否显示loading 一般页面主业务接口需要配置true
 */

const request = function(options) {
  console.log(options)
  if (!options.url) {
    console.error(`request请求没有url，参数：${options}`);
    return;
  }

  // if(wx.getStorageSync('login') === "true"){
  //   console.log("request is login!")
  //   return;
  // }

  // 超过最大链接等待
  if (requestArr.length >= maxRequestCount) {
    requestQueue.push(options);
    return;
  }

  let auth_token = wx.getStorageSync('auth_token') || '';

  // 返回的数据都处理成json对象
  options.dataType = 'json';

  // 请求失败
  options.fail = failDelegate(options.fail);
  
  // 请求完成
  options.complete = completeDelegate(options.complete, options);

  // 当前请求的索引位置
  options._index = requestArr.length;

  // 设置请求头
  options.header = {
    'content-type': 'application/json',
    // 'Authorization': `Bearer ${auth_token}`,
  };

  // 显示loading
  if (options.showLoading) {
    wx.showLoading({
      title: "加载中..."
    });
  }

  // 请求成功
  const success = options.success;

  //统一处理请求返回值
  options.success = res=>{
    // android 返回 "200" ios返回200
    if(res.statusCode == 200 && res.data && success){
      success(res.data);
    }
  };

  requestArr.push(options);

  wx.request(options);

};

// 请求报错
function failDelegate (callback) {
  return function(res) {
    wx.showToast({
      title: res,
      icon: 'none',
      duration: 5000
    });
    if (callback && typeof callback == "function") {
      callback(res);
    }
  }
}

// 请求完成
function completeDelegate(callback, options) {
    setTimeout(wx.hideLoading,500)

  return function (res) {
    if(res.statusCode && res.statusCode >= 500){
      wx.showToast({
        title: `${res.statusCode} 网络异常`,
        icon: 'none',
        duration: 5000
      });
    }

    if(res.statusCode && res.statusCode == 404){
      wx.showToast({
        title: "404",
        icon: 'none',
        duration: 5000
      });
    }

    if(res.statusCode && res.statusCode == 401){
      return router.go('register','type=401','redirectTo');
    }

    if (callback) {
      callback(res);
    }

    // 从请求列表中删除当前请求
    requestArr.splice(options._index, 1);

    if (requestQueue.length > 0) {
      request(requestQueue.shift());
    }

  }
}

module.exports = request;
