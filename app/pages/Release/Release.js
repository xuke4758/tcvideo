// pages/Release/Release.js
import base from '../../config/base.js'
import Router from '../../utils/router.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  address() {
    Router.go('address')
    // Router.go('address.method')
  },
  age() {
    Router.go('age');
  },
  show() {
    Router.go('show');
  },
  btn(e) {
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000,
      success: (res) => {
        console.log("成功")
      },
      fail: (res) => {
        console.log("失败")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {

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
    console.log(Router.p)
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