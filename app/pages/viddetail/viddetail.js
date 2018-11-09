// pages/viddetail/viddetail.js
import base from '../../config/base.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tx: base.static + '/sault/tx.png',
    s1: base.static + '/sc/1.jpg',
    s2: base.static + '/sc/2.jpg',
    s3: base.static + '/sc/3.jpg',
    s4: base.static + '/sc/4.jpg',
    xy: base.static + '/viddetail/xy.png',
    zp: base.static + '/viddetail/zp.png',
    fx: base.static + '/viddetail/fx.png',
    h: base.static + '/viddetail/h.png',
    pl: base.static + '/viddetail/pl.png',
    sc: base.static + '/viddetail/sc.png',
    gztx: base.static + '/viddetail/gztx.png',
    zpyf: base.static + '/viddetail/zpyf.png',
    yxyy: base.static + '/viddetail/yxyy.png', 
    close: base.static + '/viddetail/close.png',
    hua: base.static + '/viddetail/hua.png',
    hua_a: base.static + '/viddetail/hua_a.png', 
    comtflag: true,

    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,//left 位置
    marquee2copy_status: false,
    marquee2_margin: 20,
    orientation: 'left',//滚动方向
    interval: 20, // 时间间隔

    controls: false,
    loop: true,
    autoplay: true,

  },
  //点击评论
  comtclick() {
    this.setData({
      comtflag: false
    });
  },
  //关闭评论
  oncomtclose(e) {
    this.setData({
      comtflag: true
    });
  },
  aaa(){
    console.log(111);
  },
  carousel_num(){
    let that = this;
    wx.createSelectorQuery().select('#marqueet').fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY']
    }, function (res) {
      let length = res.width,//文字长度
        winWidth = that.data.windowWidth;
    }).exec()
  },
  run2: function () {
    var vm = this;
    let interval = setInterval(function () {
      if (-vm.data.marqueeDistance2 < vm.data.length) {
        // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
        vm.setData({
          marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace,
          marquee2copy_status: vm.data.length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin,
        });
      } else {
        console.log(vm.data.marqueeDistance2 - vm.data.marqueePace);
        if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时
          vm.setData({
            marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动
          });
          clearInterval(interval);
          vm.run2();
        } else {
          clearInterval(interval);
          vm.setData({
            marqueeDistance2: -vm.data.windowWidth
          });
          vm.run2();
        }
      }
    }, vm.data.interval);
  },
  videoplay(){
    this.videoContext.play();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //评论弹出式 视频缩小
    let that = this;
    let SystemInfo = wx.getSystemInfoSync(),
      h = (SystemInfo.windowWidth) / 750 * 744;
    let comtheit = SystemInfo.windowHeight - h +5 + 'px';
    let windowWidth = (SystemInfo.windowWidth) / 750 * 222;
    this.setData({
      comtheit,
      windowWidth
    });
    this.carousel_num();
    wx.createSelectorQuery().select('#marqueet2').boundingClientRect(function (rect) {
      
      let length = rect.width;//文字长度
      that.setData({
        length
      })

      that.run2();
    }).exec();
    //
    this.videoContext = wx.createVideoContext('myVideo')
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})