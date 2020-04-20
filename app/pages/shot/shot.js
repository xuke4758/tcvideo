// pages/shot/shot.js
import base from '../../config/base.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    close: base.static + '/shot/close.png',
    fz: base.static + '/shot/fz.png',
    sgd: base.static + '/shot/sgd.png',
    shotyy: base.static + '/shot/shotyy.png',
    shotbd: base.static + '/shot/shotbd.png',
    shotaddt: base.static + '/shot/shotaddt.png',
    shotback: base.static + '/shot/shotback.png', 
    devicetp: 'back',
    //拍照 拍视频 按钮状态 切换
    offtp: 1,
    //闪光灯 效果
    flash: 'auto',
    //拍照 视频 切换
    phflag: 1,
    //拍摄后图片
    phimg: '',
    //合成后图片
    phtxtimg: '',
    //照片集合
    phimglist: [],
    //添加文字 状态
    addtxttp: 1,
    //照片添加的文字
    entry: '',
    max20: 20,
    focus: false,
    //点击确定 添加文字
    confimb: false,
    //是否点击 拍视频 1是未点击
    pshavetp: 1, 
    //video 视频 属性控制
    controls: false,
    loop: true,
    autoplay: true,
  },
  //闪光灯切换
  devicetpfn(){
    this.setData({
      devicetp: this.data.devicetp == 'back' ? 'front' : 'back'
    });
  },
  //闪光灯 效果
  shotflashfn(){
    let flash = this.data.flash;
    if (flash == 'auto') {
      flash = 'on';
    }else if (flash == 'on') {
      flash = 'off';
    }else if (flash == 'off') {
      flash = 'auto';
    }
    this.setData({
      flash
    });
  },
  //返回拍摄
  shotback(){
    if (this.data.addtxttp == 2){
      this.setData({
        addtxttp: 1,
        focus: false,
        entry: ''
      });
    }else {
      this.setData({
        phflag: 1,
        confimb: false
      });
    }
  },
  //视频返回
  shotspback(){
    this.setData({
      phflag: 1
    });
  },
  //添加文字
  addtxt() {
    this.setData({
      addtxttp: 2,
      focus: true
    });
  },
  //继续拍照
  nextpz() {
    this.phimglistfn();
    this.setData({
      phflag: 1
    });
  },
  //拍照 下一步
  nextwc() {
    this.phimglistfn();
    this.setData({
      phflag: 1
    });
  },
  //继续拍照 或者 下一步 照片 list 处理
  phimglistfn(){
    let phimglist = this.data.phimglist,
      phimglistobj = {};
    if (!!this.data.phtxtimg) {
      phimglistobj.type = 2;
      phimglistobj.img = this.data.phtxtimg;
    } else {
      phimglistobj.type = 1;
      phimglistobj.img = this.data.phimg;
    }
    phimglist.push(phimglistobj);
    this.setData({
      phimglist,
      phtxtimg: ''
    });
  },
  //视频下一步
  nextvideo(){

  },
  //拍视频 
  pshavefn() {
    const ctx = wx.createCameraContext();
    ctx.startRecord({
      timeoutCallback: (res)=>{
        console.log('timeoutCallback.start',res);
      },
      success: (res) => {
        console.log('success.start', res);
      },
      fail: (res) => {
        console.log('fail.start', res);
      },
      complete: (res) => {
        console.log('complete.start', res);
      },
    });
    this.setData({
      pshavetp: 2
    });
  },
  //结束 拍视频 
  pshaveendfn() {
    const ctx = wx.createCameraContext();
    ctx.stopRecord({
      success: (res) => {
        //tempThumbPath  封面图片文件的临时路径
        //tempVideoPath  视频的文件的临时路径
        console.log('success.stop', res);
        this.setData({
          CameraRes: res
        });
      },
      fail: (res) => {
        console.log('fail.stop', res);
      },
      complete: (res) => {
        console.log('complete.stop', res);
        this.setData({
          pshavetp: 1,
          phflag: 3
        });
      },
    });
  },
  //拍摄照片
  takePhoto() {
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: 'normal',
      success: (res) => {
        this.setData({
          phimg: res.tempImagePath
        })
      },
      complete: (res) => {
        this.setData({
          phflag: 2
        });
        console.log('complete', res);
      },
    })
  },
  //拍照切换
  pztpfn(){
    if (this.data.offtp == 2){
      this.setData({
        offtp: 1,
        pshavetp: 1
      });
    }
  },
  //拍视频切换
  psptpfn() {
    if (this.data.offtp == 1) {
      this.setData({
        offtp: 2
      });
    }
  },
  error(e) {
    console.log(e.detail)
  },
  entryfn(e){
    this.setData({
      entry: e.detail.value
    });
  },
  //图片 添加文字
  createNewImg(){
    let text = this.data.entry;
    if (text == ''){
      wx.showToast({
        title: '写一下此刻的心情吧...',
        icon: 'none'
      })
      return;
    }
    this.setData({
      addtxttp: 3
    });
    try {
      let that = this,
        context = wx.createCanvasContext('mycanvas', 'this'),
        path = this.data.phimg,
        windowWidth = this.data.windowWidth,
        windowHeight = this.data.windowHeight;
      context.drawImage(path, 0, 0, windowWidth, windowHeight);
      context.setFontSize('22');
      context.setFillStyle('#ffffff');
      context.fillText(text, (windowWidth - context.measureText(text).width) / 2, windowHeight-windowWidth/750*166);
      that.last(context);
    } catch (err) {
      console.log('setWxbg', err);
      that.errorDraw();
    }
  },
  last(context) {
    let that = this;
    try {
      context.draw(false, function (e) {
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
            that.setData({
              phtxtimg: res.tempFilePath,
              addtxttp: 1,
              entry: '',
              confimb: true
            });
          }, fail(res) {
            that.errorDraw();
          }
        })
      })
    } catch (err) {
      console.log('last', err);
      that.errorDraw();
    }
  },
  errorDraw(str) {
    wx.hideLoading()
    wx.showToast({
      title: str || '第1个图片生成失败，请重试！',
      icon: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let SystemInfo = wx.getSystemInfoSync();
    this.setData({
      windowWidth: SystemInfo.windowWidth,
      windowHeight: SystemInfo.windowHeight
    });
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