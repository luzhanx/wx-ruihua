// pages/login/login.js
Page({

  handleLogin() {

    wx.setStorageSync('user', {
      avatar: 'https://avatars1.githubusercontent.com/u/36329267?v=4&s=120',
      nickname: '说曹操曹操就到'
    })
    wx.navigateBack({
      delta: 1
    })
  },

  getUserInfo(e) {
    // console.log(e)
    let that = this;

    wx.login({
      success(wxres) {
        wx.request({
          url: 'https://ruihua.xtow.net/api/login/register',
          method: 'post',
          data: {
            code: wxres.code,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            password: '123456',
            phone: '13076248607',
            true_name: '陈坚安'
          },
          success(res) {
            console.log(res)
          }
        })
      }
    });
  }

})