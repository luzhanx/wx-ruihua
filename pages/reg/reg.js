// pages/login/login.js
Page({

  data: {
    true_name: '',
    phone: '',
    password: '',
    password2: ''
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

    wx.setStorageSync('user', {
      avatar: 'https://avatars1.githubusercontent.com/u/36329267?v=4&s=120',
      nickname: '说曹操曹操就到'
    })
    wx.navigateBack({
      delta: 1
    })
  },
  // 注册
  getUserInfo() {

    let true_name = this.data.true_name;
    let phone = this.data.phone;
    let password = this.data.password;
    let password2 = this.data.password2;

    if (true_name === '') {
      return wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        mask: true,
      });
    }

    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      return wx.showToast({
        title: '手机号码有误',
        icon: 'none',
        mask: true,
      });
    }
    if (password === '') {
      return wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        mask: true,
      });
    }
    if (password2 !== password) {
      return wx.showToast({
        title: '第二次输入的密码不正确',
        icon: 'none',
        mask: true,
      });
    }

    wx.showLoading({
      title: '注册中',
      mask: true,
    });
    wx.login({
      success(wxres) {
        wx.getUserInfo({
          lang: 'zh_CN',
          withCredentials: true,
          success(user) {
            wx.request({
              url: 'https://ruihua.xtow.net/api/login/register',
              method: 'post',
              data: {
                code: wxres.code,
                encryptedData: user.encryptedData,
                iv: user.iv,
                password: password,
                phone: phone,
                true_name: true_name
              },
              success(res) {
                // console.log(res)
                if (res.data.code === 1) {
                  return wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    mask: true,
                    duration: 3000,
                    success() {
                      setTimeout(() => {
                        wx.navigateBack({
                          delta: 1
                        });
                      }, 3000);
                    }
                  });
                } else {
                  return wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    mask: true
                  });
                }
              },
            })
          }
        });
      }
    });
  }

})