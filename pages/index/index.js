//Page Object
Page({
  data: {
    showsj: true,
    showHelp: {
      show: false,
      title: '测试',
      content: '测试'
    }
  },
  //options(Object)
  onLoad: function (options) {

  },
  // 显示上次登录时间
  handleShowsj() {
    this.setData({
      showsj: !this.data.showsj
    })
  },
  // 跳转详情
  handleToDetail() {
    wx.navigateTo({
      url: '/pages/zfdk/zfdk',
    });
  },

  // 帮助
  handleShowHelp() {
    this.setData({
      showHelp: {
        show: !this.data.showHelp.show,
        title: '测试',
        content: '测试'
      }
    })
  },
  // 跳转用户中心
  handleToPersonal(){
    wx.switchTab({
      url: '/pages/personal/personal',
    });
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});