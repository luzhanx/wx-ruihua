import { getIndex } from './../../utils/api/api.js';
import regeneratorRuntime from './../../utils/runtime.js';

Page({
	data: {
		showsj: true,
		isLogin: false,
		showHelp: {
			show: false,
			title: '测试',
			content: '测试'
		},
		project: [
			{
				id: 1,
				project_name: '住房贷款',
				thumb: '/static/img/zfdk.png',
				remark: '住房',
				description: '111'
			},
			{
				id: 2,
				project_name: '住房租金',
				thumb: '/static/img/zfzj.png',
				remark: '租金',
				description: '222'
			},
			{
				id: 3,
				project_name: '子女教育',
				thumb: '/static/img/znjy.png',
				remark: '教育',
				description: '333'
			},
			{
				id: 4,
				project_name: '赡养老人',
				thumb: '/static/img/sylr.png',
				remark: '赡养',
				description: '444'
			},
			{
				id: 5,
				project_name: '继续教育专项附加扣除',
				thumb: '/static/img/jxjy.png',
				remark: '',
				description: '555'
			},
			{
				id: 6,
				project_name: '大病医疗',
				thumb: '/static/img/dbyl.png',
				remark: '医疗',
				description: '666'
			}
		]
	},

	async onLoad() {
		let indexRes = await getIndex();

		console.log(indexRes);
	},
	// 显示上次登录时间
	handleShowsj() {
		this.setData({
			showsj: !this.data.showsj
		});
	},
	// 跳转详情
	handleToDetail() {
		// 如果没有登录
		if (!this.data.isLogin) {
			return wx.showModal({
				title: '未登录',
				content: '是否前往登录页面',
				success(res) {
					if (res.confirm) {
						wx.navigateTo({
							url: '/pages/login/login'
						});
					}
				}
			});
		}

		wx.navigateTo({
			url: '/pages/zfdk/zfdk'
		});
	},

	// 帮助
	handleShowHelp(e) {
		let title = '';
		let content = '';
		let index = e.currentTarget.dataset.index;

		if (index !== undefined) {
			title = this.data.project[index].project_name;
			content = this.data.project[index].description;
		}

		this.setData({
			showHelp: {
				show: !this.data.showHelp.show,
				title: title,
				content: content
			}
		});
	},
	// 跳转用户中心
	handleToPersonal() {
		if (!this.data.isLogin) {
			return wx.navigateTo({
				url: '/pages/login/login'
			});
		}
		wx.switchTab({
			url: '/pages/personal/personal'
		});
	},
	onReady: function() {},
	onShow: function() {},
	onHide: function() {},
	onUnload: function() {},
	onPullDownRefresh() {
		setTimeout(() => {
			wx.stopPullDownRefresh();
		}, 2000);
	},
	onReachBottom: function() {},
	onShareAppMessage: function() {},
	onPageScroll: function() {},
	//item(index,pagePath,text)
	onTabItemTap: function(item) {}
});
