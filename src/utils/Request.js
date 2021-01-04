import axios from 'axios';

export default function Request(url, params) {
  return axios({
    baseURL: 'https://orders-and-carts.firebaseio.com/',
    url: url,
    method: 'get',
    ...params
  });
}




      


















