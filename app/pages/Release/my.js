// pages/Release/my.js
import base from '../../config/base.js'
import Router from '../../utils/router.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "my": [
      {
        "name": "公开",
        "kan": "所有人可见"
      },
      {
        "name": "好友可见",
        "kan": "互相关注好友可见"
      },
      {
        "name": "私密",
        "kan": "仅自己"
      },
    ],
    "name": "",
    "abc": "holle"
  },
  my(e) {
    this.setData({
      name: e.currentTarget.dataset.name
    })
    Router.go("Release")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: (res) => {
    // console.log(this.name)
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