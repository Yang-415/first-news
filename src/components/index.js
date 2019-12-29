import HomePageAaside from './home/homePageAside.vue'
import HomePageHeader from './home/homePageHeader.vue'
import BreadCrumb from './common/breadcrumb.vue'
import coverImg from './coverImg/index.vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('homePageAside', HomePageAaside)// 全局注册
    Vue.component('homePageHeader', HomePageHeader)// 全局注册
    Vue.component('breadcumb', BreadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-img', coverImg)
  }
}
