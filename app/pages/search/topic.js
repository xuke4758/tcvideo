// pages/search/topic.js
import base from '../../config/base.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jing: base.static + '/topic/jing.png',
    xing: base.static + '/topic/xing.png',
    hotcity: base.static + '/index/hotcity.png',
    history: base.static + '/index/history.png', 
    tx: base.static + '/sault/tx.png',
    hotqh: 1,
  },
  hotqhfn(){
    let hotqh = this.data.hotqh;
    if (hotqh == 1){
      hotqh = 2
    }else{
      hotqh = 1;
    }
    this.setData({
      hotqh
    });
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