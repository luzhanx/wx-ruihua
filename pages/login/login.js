import {
  userLogin
} from './../../utils/api/api.js';
import regeneratorRuntime from './../../utils/runtime.js';

Page({

  data: {
    phone: '',
    password: ''
  },

  // 改变输出的key值
  handleInputKey(e) {

    let key = e.target.dataset.key;
    let value = e.detail.value;

    this.setData({
      [key]: value
    });
  },

  async handleLogin() {

    let phone = this.data.phone;
    let password = this.data.password;

    // if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
    //   return wx.showToast({
    //     title: '手机号码有误',
    //     icon: 'none',
    //     mask: true,
    //   });
    // }

    if (password === '') {
      return wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        mask: true,
      });
    }

    try {
      let res = await userLogin({
        phone: phone,
        password: password
      });
      if (res.data.code === 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000,
          mask: true,
          success() {
            let token = res.data.token;
            let user = res.data.data;
            let service = res.data.service;

            // 写入缓存
            wx.setStorageSync('token', token);
            wx.setStorageSync('user', user);
            wx.setStorageSync('service', service);
            
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 2000);
          },
        });
      } else {
        return wx.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: true
        });
      }

    } catch (e) {}
  },
  // 前往注册页
  handleToReg() {
    wx.navigateTo({
      url: '/pages/reg/reg'
    });
  }

})