import ext from './utils/login'
import page_addevent from './utils/page_addevent.js'
import Router from './utils/router'
import conf_router from './config/router'
import conf_conf from './config/config.js'
//app.js
App({
  onLaunch: function (op) {
    console.log('onLaunch',op)
    let that = this;
    that.userCount();
    that.upDate();



    ext.quit();
    // page_addevent.bind([
      // { 
      //   event: 'onLoad',
      //   fun: function (res,pageFun) {
          
      //     let p = getCurrentPages().pop();
      //     let route = p.route;
      //     let isLogin = false;
      //     let method = '';
      //     let name = '';
      //     // 判断当前页面是否需要授权
      //     for (let i in conf_router) {
      //       if (conf_router[i].url == `/${route}`) {
      //         name = i + '';
      //         method = conf_router[i].method;
      //         isLogin = conf_router[i].isLogin ? true : false
      //         break;
      //       }
      //     }
      //     if (ext.hasToken()) {
      //       // 当前页面是否需要授权
      //       if (isLogin && !ext.isAuthorize()) {
      //         let paramStr = `type=401&pageName=${name}`;
              
      //         for (let i in res) {
      //           paramStr += `&${i}=${res[i]}`
      //         }
      //         if (method == 'switchTab'){
      //           Router.go('register', paramStr,'redirectTo')
      //         }else{
      //           Router.go('register', paramStr)
      //         }
              
      //       } else {
      //         record.lastView(res, () => {
      //           pageFun && pageFun();
      //           record.newsRecord(res,p);
      //           record.shareRecord(res, p);
      //           record.pagesOptions(res, p)
      //         })
      //       }

      //     } else {
      //       ext.login(b => {
      //         record.lastView(res,() =>{
      //           pageFun && pageFun();
      //           record.newsRecord(res, p); 
      //           record.shareRecord(res, p);
      //           record.pagesOptions(res, p)
      //         })
      //       })
      //     }
      //   },
      //   sort:1
      // },
      // {
      //   event: 'onShow',
      //   fun: function () {
      //     let p = getCurrentPages().pop();
      //     record.pagesRecord(p);
      //   }
      // },
      // {
      //   event: 'goscoltop',
      //   fun: function(){
      //     // 返回顶部按钮
      //     let p = getCurrentPages().pop();
      //     record.clickButton(p,'goTop');
      //   }
      // },
      // {
      //   event: 'recordClickBtn',
      //   fun: function (e) {
      //     // 点击分享按钮记录
      //     let btnname = e.target.dataset.btnname;
      //     let p = getCurrentPages().pop();
      //     record.clickButton(p, btnname);
      //   }
      // },

    // ])
  },
  onShow:function(res){
    this.globalData.scene=res.scene;
  },
  globalData: {
    userInfo: null,
    tokenCallback:null,
    // version: "trial" "release",
    env:'online',
    sharerecord: '',
    scene:'',
    order:false,//订单页优惠券
  },
  // 记录用户登录次数
  userCount() {
    let userCount = wx.getStorageSync('userCount') || 0;
    userCount++;
    wx.setStorageSync('userCount', userCount);
  },
  // 更新app
  upDate(){
    
    const updateManager = wx.getUpdateManager()
    
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
    
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，重启应用。',
        showCancel: false,
        success: function (res) {
          // if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
          // }
        }
      })

    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
  }
})