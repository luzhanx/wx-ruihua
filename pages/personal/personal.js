import {
  getIndex
} from './../../utils/api/api.js';
import regeneratorRuntime from './../../utils/runtime.js';

Page({

  data: {
    scrollTop: null,
    systemWidth: 375,
    headerBili: 1,
    isLogin: true,
    user: {
      avatar: '/static/img/avatar.png',
      username: '请点击登录', // 用户名
      true_name: '', // 真实姓名
      sex: 1, // 性别 1=男 2=女 0=未知
      age: 0, // 年龄
      company: '', // 公司
      department: '', // 部门
      position: '', // 职位
      phone: '', // 电话
    },
    service: "13800138000" //客服
  },

  onLoad: function (options) {
    // 获取屏幕宽度
    this.data.systemWidth = this.__getSystemWidth();
  },

  onShow() {
    let user = wx.getStorageSync('user');
    let service = wx.getStorageSync('service');
    // console.log(user)
    if (user !== '') {
      this.setData({
        user: {
          avatar: user.avatar,
          username: user.username,
          true_name: user.true_name,
          sex: user.sex === 1 ? '男' : '女',
          age: user.age,
          company: user.company,
          department: user.department,
          position: user.position,
          phone: user.phone,
        },
        service: service,
        isLogin: true
      })
    } else {
      this.setData({
        isLogin: false,
        user: {
          avatar: '/static/img/avatar.png',
          username: '请点击登录'
        }
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
          wx.clearStorageSync('service');

          that.data.isLogin = false;
          that.setData({
            user: {
              avatar: '/static/img/avatar.png',
              username: '请点击登录'
            },
            isLogin: false
          })
        }
      }
    })
  },

  // 登录页
  handleLogin() {
    if (this.data.isLogin === true) return;
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
  // 拨打电话
  handlePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.service
    })
  },
  // 下拉刷新
  async onPullDownRefresh() {
    let indexRes = await getIndex();

    // 登录失效
    if (indexRes.data.code === 0) {
      this.setData({
        isLogin: false,
        user: {
          avatar: '/static/img/avatar.png',
          username: '请点击登录'
        }
      })

      wx.clearStorageSync('user');
      wx.clearStorageSync('token');
      wx.clearStorageSync('service');
      wx.stopPullDownRefresh();

      return wx.showToast({
        title: indexRes.data.msg,
        icon: 'none',
        duration: 1500,
        mask: true,
      });
    }

    let user = indexRes.data.user;
    let service = indexRes.data.service;
    let isLogin = user.length === 0 ? false : true;

    this.setData({
      user: user.length === 0 ? {
        avatar: '/static/img/avatar.png',
        nickname: '请点击登录'
      } : user,
      isLogin: isLogin,
    });

    wx.setStorageSync('user', user.length === 0 ? '' : user);
    wx.setStorageSync('service', service);
    wx.stopPullDownRefresh();
  }
})