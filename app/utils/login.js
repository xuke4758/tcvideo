import config from '../config/config'


// 登录次数
let loginCount = 0;

let ext = {};

// 判断是授权
ext.isAuthorize = ()=>{
	let b = false;
	let auth_token = wx.getStorageSync('auth_token') || '';
	let user_info = wx.getStorageSync('user_info') || {};
  if (loginCount>0 && auth_token && user_info && user_info.info_authorize){
		b = true; 
	}

	return b;
}

// 是否有auth_token
ext.hasToken = ()=>{
  let auth_token = wx.getStorageSync('auth_token') || '';
  return loginCount>0 && auth_token ? true: false;
}

// 退出
ext.quit = ()=>{
  loginCount = 0;
  wx.removeStorageSync('auth_token');
  wx.removeStorageSync('user_info');
  wx.removeStorageSync('newUser')
};

ext.login = (callback) => {

	// 微信登陆
	wx.login({
		success(wxres) {
      if (wxres.code){
        wx.showLoading({
          title: "登录中..."
        });
        wx.request({
          url: config.api.login,
          data: {
            code: wxres.code,
          },
          method: 'POST',
          success: res => {

            res = res.data;
            if (res && res.code == 1) {
              loginCount++;
              wx.setStorageSync('auth_token', res.data.auth_token);
              wx.setStorageSync('user_info', res.data.user_info);
              wx.setStorageSync('activity', res.data.activity);
              getApp().globalData.env = res.data.tongji_env
              // 审核开关 如果审核中 关闭所有开关
              try {
                if (config.version == res.data.version.customer) {
                  wx.setStorageSync('isShenhe', 1);
                  let activity = {};
                  for (let i in res.data.activity) {
                    activity[i] = 0;
                  }
                  wx.setStorageSync('activity', activity);
                } else {
                  wx.setStorageSync('isShenhe', 0);
                }

              } catch (e) { }

              if (res.data.user_info && res.data.user_info.info_authorize) {
                return callback && callback(true);
              }
            }
            callback && callback(false)
          },
          fail: res => {
            wx.showToast({
              title: `${res.statusCode} 登录接口异常`,
              icon: 'none',
              duration: 5000
            });

            callback && callback(false)
          },
          complete: res => {
            setTimeout(wx.hideLoading, 0);
          }

        });
      }else{
        wx.showToast({
          title: `${wxres.errMsg} wx登录失败 请退出从试`,
          icon: 'none',
          duration: 5000
        });
        callback && callback(false);
      }

		},
    fail(wxres){
			wx.showToast({
        title: `${wxres.errMsg} wx登录失败 请退出从试`,
				icon: 'none',
				duration: 5000
			});
			callback && callback(false);
		}
	});

}

let isUserInfo = false
ext.getUserInfo = (info,callback) => {

	if (isUserInfo) {
		return
	}

	isUserInfo = true;
	wx.showLoading({
		title: "注册中..."
	});

	wx.request({
		url: config.api.userInfo,
		data: {
			encrypted_data: info.encryptedData,
			iv: info.iv,
			raw_data: info.rawData,
			signature: info.signature,
			referer: wx.getStorageSync('referer') || '',
			auth_token:wx.getStorageSync('auth_token') || ''
		},
		method: 'POST',
		success: res => {
			res = res.data;

			if (res) {
				if (res.code == 1) {
					wx.setStorageSync('user_info', res.data.user_info);
					wx.setStorageSync('auth_token', res.data.auth_token);
					return callback && callback(true);
				}

				wx.showToast({
					title: `${res.msg} 注册失败`,
					icon: 'none',
					duration: 5000
				});
			}
		},
		fail: res => {
			wx.showToast({
				title: `${res.statusCode} 注册失败`,
				icon: 'none',
				duration: 5000
			});
			return callback && callback(false);
		},
		complete: res => {
			isUserInfo = false;
			setTimeout(wx.hideLoading,0);
			
		}

	});
	
}



module.exports = ext;