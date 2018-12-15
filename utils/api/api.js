/**
 * Api 大全 
 */

const http = require('./http')


export const test = ()=> {
  console.log('test...........');
}

export const userCenter = ()=> {
  return http.get('/index/userCenter');
}