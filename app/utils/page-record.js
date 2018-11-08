import config from '../config/config';


let record = {}

//浏览店铺记录
record.lastView = function (pageres,cb){
  let user_info = wx.getStorageSync('user_info');
  let auth_token = wx.getStorageSync('auth_token');
  let reg = /^[1-9]\d*$/;
  if (reg.test(pageres.store_id)){
    // 创建订单用
    wx.setStorageSync('bslnid', pageres.store_id)

    if (user_info.lastView && user_info.lastView.seid == pageres.store_id){
      return cb()
    }else{
      //买家店铺浏览记录
      wx.request({
        url: config.api.historystore,
        header: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${auth_token}`,
        },
        data: {
          seid: pageres.store_id
        },
        method: 'POST',
        success: function(res){
        },
        fail: function(){
        },
        complete: function(){

          if (user_info.lastView) {
            user_info.lastView.seid = pageres.store_id;
          } else {
            user_info.lastView = { seid: pageres.store_id }
          }
          wx.setStorageSync('user_info', user_info);
          cb()
        }
      })
    }
  }else{
    return cb()
  }
}
 
// options记录
record.pagesOptions = function (res, p) {
  let user_info = wx.getStorageSync('user_info');
  let resStr = JSON.stringify(res)
  if (!user_info || !user_info.lastView) {
    return setTimeout(() => {
      record.pagesRecord(p)
    }, 500)
  }
  let url = 'https://stat.zhengdianhaohuo.com/trace/1.html'
  let data = {
    name: "ltxx_buyer",
    v: config.version,
    userid: user_info.id,
    storeid: user_info.lastView.seid,
    scene: getApp().globalData.scene,
    options: resStr || '',
    url: "Load=" + p.route,
    env: getApp().globalData.env,
    nickname: user_info.user_nickname
  }
  record.request(url, data)
}

//浏览页面记录
record.pagesRecord = function (p){
  let user_info = wx.getStorageSync('user_info');
  if (!user_info || !user_info.lastView) {
    return setTimeout(()=>{
      record.pagesRecord(p)
    },500)
  }
  let url = 'https://stat.zhengdianhaohuo.com/trace/1.html'
  let data = {
    name: "ltxx_buyer",
    v: config.version,
    userid: user_info.id,
    storeid: user_info.lastView.seid,
    scene: getApp().globalData.scene,
    url: "show=" + p.route,
    env: getApp().globalData.env,
    nickname: user_info.user_nickname
  }
  record.request(url, data)
}

//从消息推送进入
record.newsRecord = function (res,p) {
  let user_info = wx.getStorageSync('user_info');
  if (!user_info) {
    return setTimeout(() => {
      record.newsRecord(res,p)
    }, 500)
  }
  if(res.push){
      let url = 'https://stat.zhengdianhaohuo.com/trace/1.html';
      let data = {
        name: "ltxx_buyer",
        v: config.version,
        userid: user_info.id,
        storeid: user_info.lastView.seid,
        entrance: 'push_' + res.push,
        url: p.route,
        env: getApp().globalData.env,
        nickname: user_info.user_nickname
      }
    record.request(url, data)
  }
}

//点击按钮记录
record.clickButton = function(p,namety){
  let user_info = wx.getStorageSync('user_info');
    let url = 'https://stat.zhengdianhaohuo.com/ltxx/1.html',
    data = {
      name: "ltxx_buyer",
      page: p.route,
      productid: '',
      userid: user_info.id,
      storeid: user_info.lastView.seid,
      button_name: namety,
      act: 'click',
      env: getApp().globalData.env
    }
  record.request(url, data)
}

//从分哼店铺和分享商品详情进入
record.shareRecord = function (res, p) {
  let dcencodeRes = decodeURIComponent(res)
  let user_info = wx.getStorageSync('user_info');
  if (!user_info) {
    return setTimeout(() => {
      record.shareRecord(res, p)
    }, 500)
  } else {
    if (res.sharerecord) {
      getApp().globalData.sharerecord = res.sharerecord
      let url = 'https://stat.zhengdianhaohuo.com/trace/1.html'
      let data = {
        name: "ltxx_buyer",
        v: config.version,
        userid: user_info.id,
        storeid: user_info.lastView.seid,
        entrance: 'sharerecord_' + res.sharerecord,
        url: p.route,
        env: getApp().globalData.env,
        nickname: user_info.user_nickname
      }
      record.request(url, data)

    } else if (dcencodeRes.sharerecord) {
      getApp().globalData.sharerecord = dcencodeRes.sharerecord
      let url = 'https://stat.zhengdianhaohuo.com/trace/1.html'
      let data = {
        name: "ltxx_buyer",
        v: config.version,
        userid: user_info.id,
        storeid: user_info.lastView.seid,
        entrance: 'sharerecord_' + dcencodeRes.sharerecord,
        url: p.route,
        env: getApp().globalData.env,
        nickname: user_info.user_nickname
      }
      record.request(url, data)

    }
    
  }
}


//wx.request
record.request = function (url, parma){
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json'
    },
    data: parma,
    method: 'GET',
    success: function () { }
  })
}

module.exports = record;
