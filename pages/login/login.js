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
  }

})