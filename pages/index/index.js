import {
	getIndex
} from './../../utils/api/api.js';
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
		project: [],
		user: {
			avatar: '/static/img/avatar.png',
			true_name: '', // 姓名
			company: '', // 公司
			last_time: '', // 上次登录时间
		}
	},

	async onLoad() {
		let indexRes = await getIndex();
		let project = indexRes.data.project;
		let company = indexRes.data.company;

		// 登录失效
		if (indexRes.data.code === 0) {
			this.setData({
				isLogin: false,
				project: project,
				user: {
					avatar: '/static/img/avatar.png'
				}
			})
			wx.clearStorageSync('user');
			wx.clearStorageSync('token');
			wx.clearStorageSync('service');
			wx.setStorageSync('company', company);
			return wx.showToast({
				title: indexRes.data.msg,
				icon: 'none',
				duration: 1500,
				mask: true,
			});
		}

		let user = indexRes.data.user;
		let service = indexRes.data.service;
		let isLogin = user.length === 0 ? false : true;

		this.setData({
			user: user.length === 0 ? {
				avatar: '/static/img/avatar.png'
			} : user,
			project: project,
			isLogin: isLogin,
		});

		wx.setStorageSync('user', user.length === 0 ? '' : user);
		wx.setStorageSync('service', service);
		wx.setStorageSync('company', company);
	},

	onShow() {
		let user = wx.getStorageSync('user');

		if (user !== '') {
			this.setData({
				user: {
					avatar: user.avatar,
					true_name: user.true_name,
					company: user.company,
					last_time: user.last_time
				},
				isLogin: true
			})
		} else {
			this.setData({
				isLogin: false,
				user: {
					avatar: '/static/img/avatar.png'
				}
			})
		}
	},

	// 显示上次登录时间
	handleShowsj() {
		this.setData({
			showsj: !this.data.showsj
		});
	},
	// 跳转详情
	handleToDetail(e) {
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
		let id = e.currentTarget.dataset.id;
		let name = e.currentTarget.dataset.name;
		let urlName = '';

		switch (id) {
			case 1:
				urlName = 'zfdk';
				break;
			case 2:
				urlName = 'zfzj';
				break;
			case 3:
				urlName = 'znjy';
				break;
			case 4:
				urlName = 'sylr';
				break;
			case 5:
				urlName = 'jxjy';
				break;
			case 6:
				urlName = 'dbyl';
				break;
			default:
				return wx.showToast({
					title: '程序异常,请联系小程序管理员',
					icon: 'none',
					mask: true,
				});
		}

		wx.navigateTo({
			url: `/pages/${urlName}/${urlName}?title=${name}`
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

	async onPullDownRefresh() {
		let indexRes = await getIndex();
		let project = indexRes.data.project;

		// 登录失效
		if (indexRes.data.code === 0) {
			this.setData({
				isLogin: false,
				project: project,
				user: {
					avatar: '/static/img/avatar.png'
				}
			})

			wx.clearStorageSync('user');
			wx.clearStorageSync('token');
			wx.clearStorageSync('service');
			wx.stopPullDownRefresh();

			return wx.showToast({
				title: indexRes.data.msg,
				icon: 'none',
				duration: 1500,
				mask: true,
			});
		}

		let user = indexRes.data.user;
		let service = indexRes.data.service;
		let isLogin = user.length === 0 ? false : true;

		this.setData({
			user: user.length === 0 ? {
				avatar: '/static/img/avatar.png'
			} : user,
			project: project,
			isLogin: isLogin,
		});

		wx.setStorageSync('user', user.length === 0 ? '' : user);
		wx.setStorageSync('service', service);
		wx.stopPullDownRefresh();

	},
	onShareAppMessage: function () {},
});