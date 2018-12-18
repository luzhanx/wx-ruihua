import {
  getZfzj,
  saveZfzj
} from './../../utils/api/api.js';
import regeneratorRuntime from './../../utils/runtime.js';

Page({
  data: {
    array: [],
    index: null
  },

  async onLoad(options) {
    // 动态设置标题
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title,
      });
    }

    let res = await getZfzj();

    let index = res.data.info.indexOf(`${res.data.fund.money}`);

    this.setData({
      array: res.data.info,
      index: index === -1 ? null : index
    })

  },
  async handleSave() {
    let index = this.data.index;

    if (index === null) {
      return wx.showToast({
        title: '请选择金额',
        icon: 'none',
        mask: true
      });
    }
    let money = this.data.array[index];

    let res = await saveZfzj({
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
  },
  // 选择器
  handlePickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  }
});