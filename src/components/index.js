import HomePageAaside from './home/homePageAside.vue'
import HomePageHeader from './home/homePageHeader.vue'
import BreadCrumb from './common/breadcrumb.vue'
export default {
  install (Vue) {
    Vue.component('homePageAside', HomePageAaside)// 全局注册
    Vue.component('homePageHeader', HomePageHeader)// 全局注册
    Vue.component('breadcumb', BreadCrumb)
  }
}
