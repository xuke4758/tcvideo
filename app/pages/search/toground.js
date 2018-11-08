// pages/search/toground.js
import base from '../../config/base.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchimg: base.static + '/index/search.png',
    cha: base.static + '/search/cha.png',
    searchval: '产后',
    list: [
      { img: base.static + '/sc/1.jpg', xing_a: 1, shatype: 1 },
      { img: base.static + '/sc/4.jpg', xing_a: 2, shatype: 2 },
      { img: base.static + '/sc/3.jpg', xing_a: 1, shatype: 1 },
      { img: base.static + '/sc/5.jpg', xing_a: 2, shatype: 2 },
      { img: base.static + '/sc/6.jpg', xing_a: 1, shatype: 1 },
      { img: base.static + '/sc/2.jpg', xing_a: 2, shatype: 1 },
    ],
    legtype: 1,
    comprrtp: 1,
    userlist: [
      { type: 1, },
      { type: 2, }
    ]
  },
  //关注与已关注切换
  followtype(e) {
    let dataset = e.currentTarget.dataset,
      userlist = this.data.userlist;
    if (dataset.type == 1){
      userlist[dataset.index].type = dataset.type == 1 ? 2 : 1;
      this.setData({
        userlist
      });
    }else{
      wx.showModal({
        title: '是否取消关注',
        content: '',
        confirmColor: '#4a90e2',
        success: (res)=> {
          if (res.confirm) {
            userlist[dataset.index].type = dataset.type == 1 ? 2 : 1;
            this.setData({
              userlist
            });
          } else if (res.cancel) {
            
          }
        }
      })
    }
  },
  //切换 1综合 2用户 3话题
  tpswitch(e){
    let dataset = e.currentTarget.dataset;
    this.setData({
      comprrtp: dataset.type
    });
  },
  //input点击
  searchinput(){
    this.setData({
      legtype: 1
    });
  },
  //点击联想 后
  searchswitch(){
    this.setData({
      legtype:2
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