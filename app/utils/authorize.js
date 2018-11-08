let BOOK = {
  'scope.userInfo': {
    content: '您未授权基本信息，设置后正常使用'
  },
  'scope.address':{
    content: '您未授权收货地址，设置后正常使用'
  },
  'scope.userLocation': {
    content: '您未授权地理位置，设置后正常使用'
  },
  'scope.record': {
    content: '您未授权录音功能，设置后正常使用'
  },
  'scope.writePhotosAlbum': {
    content: '您未授权保存到相册功能，设置后正常使用'
  },
  'scope.camera': {
    content: '您未授权打开相机功能，设置后正常使用'
  },
  'scope.werun': {
    content: '您未授权微信运动功能，设置后正常使用'
  }
}

let authorize = function (name, callback) {

  name = `scope.${name}`;

  // 是否授权过
  // if (wx.getStorageSync(name)) {
  //   console.log(name ,1112222)
  // 	callback && callback(true);
  // 	return;
  // }

  // 获取授权状态
  wx.getSetting({
    success(res) {
      // console.log(res)
      let arrAuthSetting = Object.getOwnPropertyNames(res.authSetting)
      // 提示过用户授权 但是没有通过
      if (arrAuthSetting.indexOf(name) > -1 && !res.authSetting[name]) {
        // 弹出一个窗口 引导打开
        wx.showModal({
          title: '授权提示',
          content: BOOK[name].content || '您未授权功能，设置后正常使用',
          showCancel: false,
          confirmText: '去授权',
          success: res => {
            wx.openSetting({
              success: res => { }
            })
            callback && callback(false);
          }
        })

      } else if (arrAuthSetting.indexOf(name) == -1) {

        // 没有提示过弹出授权
        wx.authorize({
          scope: name,
          success: res => {
            wx.setStorageSync(name, '1');
            callback && callback(true);
          },
          fail: res => {

            // wx.showToast({
            // 	title: `${JSON.stringify(res)} 授权失败`,
            // 	icon: 'none',
            // 	duration: 5000
            // });
            // 授权失败
            callback && callback(false);
          }
        })
      } else {
        wx.setStorageSync(name, '1');
        callback && callback(true);
      }
    }
  });
}

module.exports = authorize;

