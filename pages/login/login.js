// pages/login/login.js
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

  handleLogin() {

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

    wx.request({
      url: 'https://ruihua.xtow.net/api/login/index',
      data: {
        phone: phone,
        password: password
      },
      method: 'POST',
      success: (res) => {
        console.log(res);
        if (res.data.code === 1) {
          // wx.navigateBack({
          //   delta: 1
          // })
        } else {
          return wx.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true
          });
        }
      },
      fail() {
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          mask: true,
        });
      },
    });


  },
  // 前往注册页
  handleToReg() {
    wx.navigateTo({
      url: '/pages/reg/reg'
    });
  }

})