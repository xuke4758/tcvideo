import config from '../config/router';
import ext from './login'

// const eventManager = require('./eventmanager');

let router = {};
// let tabPagePaths = [];  // e.g., /list/list

// (() =>{
//   const pages = Object.keys(config);
//   for(let page of pages){
//     if(config[page].inMethod === 'switchTab'){
//       tabPagePaths.push(config[page].url.match(/pages(\/\w+\/\w+)/)[1]);
//     }
//   }
// })();
router.go = function(pageName, paramStr, method){
  const currentPages = getCurrentPages();
  // 要去的页面
  let toPage = config[pageName]||{};


  // 当前页面路由
  const fromPageUrl = currentPages[currentPages.length - 1].__route__ || '';
  let totalLength = currentPages.length;
  let toPageIndex;
  // for(let p in config){
  //   let page = config[p];
  //   if(page.url === fromPageUrl){
  //     // fromPage = page;
  //     break;
  //   }
  // }
  

  // 需要登录 && 没有注册
  // 去注册页
  if (toPage.isLogin && !ext.isAuthorize()){
    toPage = config['register']||{};
    paramStr+=`&type=401&pageName=${pageName}`;
  }  

  // 判断当前路由是否打开 打开后会退
  for(let p in currentPages){
    let page = currentPages[p];
    if (`/${page.route}` === toPage.url){
      method = 'navigateBack';
      toPageIndex = parseInt(p) + 1;
      break;
    }
  }

  // "switchTab"
  // if (toPage.method =='switchTab'){
  //   method = toPage.method;
  // }

  // 页面跳转方式
  method = method || toPage.method || 'redirectTo';
  
  // console.log('router p -----', currentPages,method);
  if(method == "navigateBack"){
    // 回退后一页 触发onload 传参数
    wx[method]({
      delta : totalLength - toPageIndex,
      success:function(e){
 
        let idx = totalLength - toPageIndex
        let p = currentPages[currentPages.length - 1 - idx];
        console.log('router p -----', currentPages,p);

        let opt = {
          method: 'navigateBack'
        };
        if(paramStr){
          
          try{
            let arr = paramStr.split('&');
            arr.forEach((item)=>{
              let a = item.split('=');
              opt[a[0]]= a[1];
            });
          }catch(e){console.error(e)}
          
        }
        console.log('1111111,router opt -----', opt);

        if(p){
          p.onLoad(opt);
        }
        
      }
    });
  }else{
    console.log(method,toPage,toPage.url+'?'+paramStr)
    wx[method]({
      url: `${toPage.url}?${paramStr}`
    });
  }

  // router.checkAuthorize();
}

// router.checkAuthorize = function(){
//   if(!wx.canIUse('getSetting')){
//     eventManager.emit('authorize');
//     return;
//   }
//   // 跳转页面时判断用户是否授权。 如果没有则提示用户去授权
//   wx.getSetting({
//     success(res){
//       if(!res.authSetting['scope.userInfo']){
//         wx.showModal({
//           title       : '提示',
//           content     : '小程序需要获取用户信息权限，点击确认前往设置？',
//           showCancel  : true,
//           confirmText : "确认",
//           success     : function(res){
//             if(res.confirm){
//               wx.openSetting({
//                 success(res){
//                   // console.log(res);
//                   if(!res.authSetting['scope.userInfo']){
//                     return;
//                   }
//                   eventManager.emit('authorize');
//                 }
//               })
//             }
//           }
//         });
//       }
//     }
//   })
// }

router.getPageNameByUri = function(uri){
  const currentPages = getCurrentPages();
  for(let p in currentPages){
    let page = currentPages[p];
    if(page.__route__ === uri){
      return p
    }
  }
}

router.getCurrentPageName = function(){
  const uri = router.getCurrentPagePath();
  return router.getPageNameByUri(uri);
}

router.getCurrentPagePath = function(){
  const currentPages = getCurrentPages();
  const page = currentPages[currentPages.length - 1];
  return page.route || page.__route__ || 'pages/index/index';
}

// 通过路由名获取页面路径
router.getPagePathByName = function(name){
  return config[name].url;
};

// 首页tab中的页面使用switchTab方式其他页面全部用redirectTo方式跳转
// router.jump = function(url){
//   let pagePath = url.match(/(pages|\.\.)(\/\w+\/\w+)/);
//   if(pagePath.length < 3){
//     console.error('跳转路径非法');
//     return;
//   }

//   pagePath = pagePath[2];

//   if(tabPagePaths.indexOf(pagePath) !== -1){
//     wx.switchTab({
//       url,
//     })
//   }else{
//     wx.redirectTo({
//       url,
//     })
//   }

// }


router.reLaunch = function (pageName, paramStr, method){
  let toPage = config[pageName] || {};
  wx.reLaunch({
    url: `${toPage.url}?${paramStr}`
  })
} 




router.config = config;

module.exports = router;