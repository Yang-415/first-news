import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
Vue.use(ElementUi)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
