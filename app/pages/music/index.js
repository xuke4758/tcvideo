// pages/music/index.js
import base from '../../config/base.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tx: base.static + '/sault/tx.png',
    searchimg: base.static + '/index/search.png',
    bft: base.static + '/selmusic/bft.png',
    ztt: base.static + '/selmusic/ztt.png',
    xing: base.static + '/selmusic/xing.png',
    xing_a: base.static + '/selmusic/xing_a.png',
    musicty: 1,
  },
  musictyfn(e){
    let dataset = e.currentTarget.dataset,
      musicty = this.data.musicty;
    if (dataset.type != musicty) {
      musicty = dataset.type;
      this.setData({
        musicty
      });
    }
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