import axios from 'axios';

export default function Request(url, params) {
  return axios({
    // 野狗云关闭 所以野狗云的接口无法使用
    // baseURL: 'https://wd4782151544jfcwop.wilddogio.com/',
    // 所以使用谷歌的firebase代替
    baseURL: 'https://axios-app-b8cca.firebaseio.com/',
    url: url,
    method: 'get',
    ...params
  });
}
