import axios from 'axios';
const baseURL = 'http://47.244.216.195:8083/';
import {Message} from 'element-ui'
const request = axios.create({
  baseURL,
  timeout: 15000
});

request.interceptors.response.use(function (res) {
  return Promise.resolve(res.data)
}, function (error) {
  return Promise.reject(error);
})
export default request;

