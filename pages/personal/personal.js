import {
  userCenter
} from './../../utils/api/api.js';

Page({

  data: {
    scrollTop: null,
    systemWidth: 375,
    headerBili: 1,
    isLogin: false,
    user: {
      avatar: '/static/img/avatar.png',
      nickname: '请点击登录'
    }
  },

  onLoad: function(options) {
    // 获取屏幕宽度
    this.data.systemWidth = this.__getSystemWidth();
  },

  onShow: function() {
    let user = wx.getStorageSync('user');
    // console.log(user)
    if (user !== '') {
      this.setData({
        user: {
          avatar: user.avatar,
          nickname: user.nickname
        },
        isLogin: true
      })
    }
  },
  // 注销登录
  handleLogout() {
    let that = this;

    wx.showModal({
      title: '注销登录',
      content: '确定要注销登录吗?',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync('user');
          wx.clearStorageSync('token');

          that.data.isLogin = false;
          that.setData({
            user: {
              avatar: '/static/img/avatar.png',
              nickname: '请点击登录'
            },
            isLogin: false
          })
        }
      }
    })
  },

  // 登录页
  handleLogin() {
    if(this.data.isLogin === true) return;
    wx.navigateTo({
      url: `/pages/login/login?form=personal`,
    })
  },

  // 滚动监听
  onPageScroll(e) {
    // 比例 340 / 375 ≈ 0.907；
    let headerH = parseInt(this.data.systemWidth * 0.907, 10) / 2; // header高度
    let bili = (headerH - e.scrollTop) / headerH; // 比例

    if (bili < 1.2) {
      this.setData({
        headerBili: bili
      });
    }
  },

  // 获取设备信息
  __getSystemWidth() {
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
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})