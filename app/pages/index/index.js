// pages/index/index.js
import base from '../../config/base.js'
import Router from '../../utils/router.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchimg: base.static + '/index/search.png',
    dw: base.static + '/index/dw.png',
    qh: base.static + '/index/qh.png',
    list: [
      { img: base.static + '/sc/1.jpg', xing_a: 1, shatype: 1 },
      { img: base.static + '/sc/4.jpg', xing_a: 2, shatype: 2 },
      { img: base.static + '/sc/3.jpg', xing_a: 1, shatype: 1 },
      { img: base.static + '/sc/5.jpg', xing_a: 2, shatype: 2 },
      { img: base.static + '/sc/6.jpg', xing_a: 1, shatype: 1 },
      { img: base.static + '/sc/2.jpg', xing_a: 2, shatype: 1 },
    ]
  },
  gocity(){
    Router.go('city');
  },
  gosearch(){
    Router.go('search');
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