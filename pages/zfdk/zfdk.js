import {
  getZfdk,
  saveZfdk
} from './../../utils/api/api.js';
import regeneratorRuntime from './../../utils/runtime.js';

Page({
  data: {
    array: ['不分摊', '分摊'],
    index: null,
    money: 0,
    info: {
      apportion: 0,
      money: 0,
      month: 0
    }
  },

  async onLoad(options) {
    // 动态设置标题
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title,
      });
    }

    let res = await getZfdk();

    if (res.data.loans !== null) {
      this.setData({
        index: res.data.loans.apportion,
        money: res.data.loans.money
      })
    }

    this.setData({
      info: res.data.info
    })

    console.log(res)

  },
  async handleSave() {
    let apportion = this.data.index;
    let money = this.data.money;

    if (apportion === null) {
      return wx.showToast({
        title: '请选择分摊情况',
        icon: 'none',
        mask: true
      });
    }

    let res = await saveZfdk({
      apportion: apportion,
      money: money
    });
    if (res.data.code === 1) {
      return wx.showToast({
        title: res.data.msg + ', 别忘了回首页提交修改哦',
        icon: 'none',
        mask: true
      });
    } else {
      return wx.showToast({
        title: res.data.msg,
        icon: 'none',
        mask: true
      });
    }
    console.log(res)
  },


  // 选择是否分摊
  handlePickerChange(e) {
    let index = parseInt(e.detail.value, 10);
    let infoApportion = this.data.info.apportion;
    let infoMonth = this.data.info.month;
    let money = 0;

    if (index === 1) {
      // 分摊
      money = infoMonth * infoApportion / 100;
    } else {
      // 不分摊
      money = infoMonth;
    }
    console.log(index)
    this.setData({
      index: e.detail.value,
      money: money,
    })
  }
});