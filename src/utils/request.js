// 1.引入axios
// 2.用axios.interceptors.request.use()的方法；
// 3.给axios统一注入token
// 4.导出axios在main.js中引入
// 5.从element-ui中导出Message
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 统一配置axios的公共请求路径
// 请求拦截
axios.interceptors.request.use(function (config) {
  // config会拿到axios的所有的配置
  let token = window.localStorage.getItem('infoToken')
  config.headers.Authorization = `Bearer ${token}`// 所以的axios统一配置token令牌
  return config
}, function () { })
// 响应拦截
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = ''
  switch (status) {
    case 401:
      router.push('/login')
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '404 手机号不正确'
      break
    case 403:
      router.push('/login')
      break
    case 400:
      message = '请求参数错误'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
})
export default axios
