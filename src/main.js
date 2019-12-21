import Vue from 'vue'
import App from './App.vue'
import './promission'
import router from './router'
import ElementUi from 'element-ui'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
// 引入components组件
import component from './components/index.js'
import axios from './utils/request.js'
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
Vue.use(ElementUi)
// 全局注册component组件，注册之后普就会调用install的方法，调用install
// 时传入Vue，可用vue注册全局组件就不用多次引入注册局部组件；
Vue.use(component)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
