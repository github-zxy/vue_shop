import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
//第三方ui
import TreeTable from 'vue-table-with-tree-grid'

//导入富文本编辑器
import VueQuillEditor from "vue-quill-editor"
//导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


//导入 NProgress 包对应的JS和CSS
import NProgress from "nprogress"
import 'nprogress/nprogress.css'


//导入axios
import axios from 'axios'
//配置根路劲
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//请求唯一接口API
axios.interceptors.request.use(config => {
  //
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //在最后必须 return config
  return config
})
//在 response 拦截器中,隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => { 
  NProgress.done()
  return config
})

//挂载到vue原型
Vue.prototype.$http = axios


// Vue控制区域
Vue.config.productionTip = false
//使用第三方ui
Vue.component('tree-table', TreeTable)

//将富文本编辑器,注册为全局可用的组件
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
