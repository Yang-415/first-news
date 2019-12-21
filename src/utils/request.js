// 1.引入axios
// 2.用axios.interceptors.request.use()的方法；
// 3.给axios统一注入token
// 4.导出axios在main.js中引入
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  console.log(config)
  let token = window.localStorage.getItem('infoToken')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function () {})
export default axios
