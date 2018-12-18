/**
 * Api 大全 
 */

const http = require('./http');

export const test = () => {
	console.log('test...........');
};

export const userCenter = () => {
	return http.get('/index/userCenter');
};

// 登录
export const userLogin = (data) => http.post('/api/login', data);

// 注册
export const userRegister = (data) => http.post('/api/login/register', data);

// 首页
export const getIndex = () => http.get('/api/user');


// 住房贷款信息
export const getZfdk = () => http.get('/api/project/loans');
// 住房贷款提交
export const saveZfdk = (data) => http.post('/api/project/loans', data);

// 住房租金信息
export const getZfzj = () => http.get('/api/project/fund');
// 住房租金提交
export const saveZfzj = (data) => http.post('/api/project/fund', data);