//Page Object
Page({
  data: {
    array: ['分摊', '不分摊'],
    index: 1
  },

  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.title,
    });
  },

  // 选择是否分摊
  handlePickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  }
});