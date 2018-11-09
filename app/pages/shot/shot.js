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
    devicetp: 'back',
    offtp: 1,
    phflag: 1,
  },
  //闪光灯切换
  devicetpfn(){
    this.setData({
      devicetp: this.data.devicetp == 'back' ? 'front' : 'back'
    });
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
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
    console.log(1);
    if (this.data.offtp == 2){
      this.setData({
        offtp: 1
      });
    }
  },
  //拍视频切换
  psptpfn() {
    console.log(2);
    if (this.data.offtp == 1) {
      this.setData({
        offtp: 2
      });
    }
  },
  error(e) {
    console.log(e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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