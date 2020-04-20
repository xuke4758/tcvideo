// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    color: "#4A90E2",
    abc: [
      {
        "image": "../../assets/classification.png",
        "name": "辣妈败家好购物推荐",
        "num": "1.2万",
        "gengduo": "../../assets/More.png",
        "img": [
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" }
        ]
      },
      {
        "image": "../../assets/classification.png",
        "name": "购物推荐",
        "num": "9千",
        "gengduo": "../../assets/More.png",
        "img": [
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" }
        ]
      },
      {
        "image": "../../assets/classification.png",
        "name": "宝宝优选",
        "num": "1亿",
        "gengduo": "../../assets/More.png",
        "img": [
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" },
          { "images": "../../assets/erzi.jpg" }
        ]
      }
    ]
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