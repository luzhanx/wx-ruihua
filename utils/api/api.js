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

// 注册
export const userRegister = (data) => http.post('/api/login/register', data);

// 首页
export const getIndex = () => http.get('/api/user');
