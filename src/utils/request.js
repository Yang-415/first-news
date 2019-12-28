// 1.引入axios
import axios from 'axios'
// 5.从element-ui中导出Message
import { Message } from 'element-ui'
// 6.引入路由表，因为后面要强制 跳到login页面所以要引入router
import router from '../router'
// 7.js数据有最大安全值所以在运算或json对象转换时会出现误差，因此需引入bigint
// 包，对response回来之前的数据进行处理
import bigInt from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 统一配置axios的公共请求路径
// 请求拦截
// 2.用axios.interceptors.request.use()的方法；
axios.interceptors.request.use(function (config) {
  // config会拿到axios的所有的配置
  let token = window.localStorage.getItem('infoToken')
  config.headers.Authorization = `Bearer ${token}`// 所以的axios统一配置token令牌
  return config// 3.给axios统一注入token
}, function () { })
// 响应拦截
axios.defaults.transformResponse = [function (data) {
  return data ? bigInt.parse(data) : {}
}]
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : { response }
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
  return Promise.reject(error)
})
// 4.导出axios在main.js中引入
export default axios
