import { test } from './../../utils/api/api.js';

Page({

  data: {
    scrollTop: null,
    systemWidth: 375,
    headerBili: 1
  },

  onLoad: function (options) {
    this.systemWidth = this.__getSystemWidth();
    
    // wx.request({
    //   url: 'https://ruihua.xtow.net/api/index',
    //   header: {
    //     token: '111'
    //   }
    // })
  },

  onShow: function () {
    
  },

  // 滚动监听
  onPageScroll(e){
    // 比例 340 / 375 ≈ 0.907；
    let headerH = parseInt(this.systemWidth * 0.907, 10) / 2; // header高度
    let bili = (headerH - e.scrollTop) / headerH;             // 比例
    
    if (bili < 1.2) {
      this.setData({
        headerBili: bili
      });
    }
  },

  // 获取设备信息
  __getSystemWidth(){
    try {
      const res = wx.getSystemInfoSync()
      return res.windowWidth;
    } catch (e) {
      wx.showModal({
        content: '获取设备信息失败',
      });
    }
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