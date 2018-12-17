const fetch = require('./fetch');
const host = 'https://ruihua.xtow.net';

const http = {
  get(url, params) {
    return fetch(host + url, 'GET', null, params);
  },
  post(url, data, params) {
    return fetch(host + url, 'POST', data, params);
  },
  uploadFile(url, file, data) {
    let token = wx.getStorageSync('token');
    let headers = {
      'content-type': 'application/json',
      'token': token
    };
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: host + url,
        filePath: file.path[0],
        name: file.name,
        formData: data,
        header: headers,
        success(res) {
          var data = res.data
          //do something
          resolve(JSON.parse(data));
        },
        fail(err) {
          console.log(err);
          reject(err);
        }
      })
    });
  }
}

module.exports = http;
