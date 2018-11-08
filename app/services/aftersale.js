import config from '../config/config';
import request from '../utils/request';

let service = {};
//提交申请信息 
service.submission = (param, cb) => {
  param = param || {};
  let requestUrl = config.api.submission;
  request({
    url: requestUrl,
    // showLoading: true,
    data: param,
    method: 'GET',
    success: res => {
      cb(res);
    }
  });
}
//提交申请售后
service.saleAfterCreate = (param, cb) => {
  param = param || {};
  let requestUrl = config.api.saleAfterCreate;
  request({
    url: requestUrl,
    // showLoading: true,
    data: param,
    method: 'POST',
    success: res => {
      cb(res);
    }
  });
}

//提交撤销售后/提交退货物流
service.saleAfterUpdate = (param, cb) => {
  param = param || {};
  let requestUrl = config.api.saleAfterUpdate;
  request({
    url: requestUrl,
    // showLoading: true,
    data: param,
    method: 'PUT',
    success: res => {
      cb(res);
    }
  });
}

//获取退单详情
service.saleAfterGetInfo = (param, cb) => {
  param = param || {};
  let requestUrl = config.api.saleAfterGetInfo;
  request({
    url: requestUrl,
    // showLoading: true,
    data: param,
    method: 'GET',
    success: res => {
      cb(res);
    }
  });
}

//获取物流
service.saleAfterGetExpress = (param, cb) => {
  param = param || {};
  let requestUrl = config.api.saleAfterGetExpress;
  request({
    url: requestUrl,
    showLoading: true,
    data: param,
    method: 'GET',
    success: res => {
      cb(res);
    }
  });
}
//提交售后上传图片
service.uploadimage = (param, cb) => {
  param = param || {};
  let requestUrl = config.api.uploadimage;
  request({
    url: requestUrl,
    // showLoading: true,
    data: param,
    method: 'POST',
    success: res => {
      cb(res);
    }
  });
}

//获取供应商退货地址
service.getsupplieraddr = (param, cb) => {
  param = param || {};
  let requestUrl = config.api.getsupplieraddr;
  request({
    url: requestUrl,
    // showLoading: true,
    data: param,
    method: 'GET',
    success: res => {
      cb(res);
    }
  });
}


module.exports = service;