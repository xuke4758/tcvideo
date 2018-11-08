"use strict";
import base from './base.js';
// 公用配置
const apiUrl = base.apiUrl;
const config = {
  //当前提交的小程序版本
  version:'1.0.0',
  api: {
    // 登录
    login: `${apiUrl}/login`,
    
    //最下一行，请往上填
    getBaseUrl: `${apiUrl}/ping`
  },
  baseResult: {
    errMsg: "request:ok",
    data: {},
    statusCode: 200
  },
  nameSpace: {
    cookieName: "userCookies"
  }
};

module.exports = config;