import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Vant, { Lazyload } from 'vant'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import 'amfe-flexible'
import 'vant/lib/index.css'
import './styles/index.less'
import '@/filters'

Vue.use(Vant)
Vue.use(Lazyload)
Vue.use(VeeValidate, {
  events: 'blur'
})
Validator.localize('zh-cn', zhCN)
// 给所有vue实例增加一个$sleep方法 延时执行
Vue.prototype.$sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
