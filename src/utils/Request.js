import axios from 'axios';

export default function Request(url, params) {
  return axios({
    baseURL: 'https://orders-and-carts.firebaseio.com/',
    url: url,
    method: 'get',
    ...params
  });
}
 // 野狗云关闭 所以野狗云的interface无法使用
    // baseURL: 'https://wd4782151544jfcwop.wilddogio.com/',
    // 使用谷歌的firebase代替



      


















