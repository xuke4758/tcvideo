// demo 给每个页面追加事件
// page_addevent.bind([{
//   event: 'onLoad',
//   fun: function () { console.log("onLoad") }
// },{
//   event: 'lmTest',
//   fun: function (e,callback) { console.log("lmTest");callback() },
//   sort:1// 默认不传 ==1时 先执行App事件在执行Page事件 fun的第二个参数必须为callback
// }])

let ext = {};

ext.bind = function (arr) {
  let _Page = Page;
  Page = function (page) {
    // page 为app.json里的pages对应的路由对象
    arr.forEach(obj => {
      if (obj.event && obj.fun) {
        callEvent(page, obj.event, obj.fun, obj.sort);
      }
    })
    _Page(page)
  }
}

// 把方法追加到事件中
function callEvent(page, event, fun, sort) {
  if (page[event]) {
    var _pageEvent = page[event];
    page[event] = function (opt) {

      if (sort && sort == 1) {
        // 先执行App自定义事件 再执行page页面事件
        fun.call(this, opt, ()=>{
          _pageEvent.call(this, opt)
        });

      } else {
        // 先执行page页面事件 再执行App自定义事件
        _pageEvent.call(this, opt);
        fun.call(this, opt);
      }

    }
  } else {
    page[event] = function (opt) {
      fun.call(this, opt, event)
    }
  }
}

module.exports = ext;