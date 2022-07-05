import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import request from "@/utils/request";
import JsonExcel from "vue-json-excel";
import utils from '@/utils/utils'
Vue.use(ElementUI, "small");

// 导入导出excel的插件
Vue.component('downloadExcel',JsonExcel)
Vue.prototype.utils = utils
Vue.prototype.request = request

Vue.config.productionTip = false
Vue.filter('dateFormate', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2,'0')

  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.getSeconds() + '').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
// 路由拦截重定向处理
let routerWhiteList = ['/admin/login']
router.beforeEach((to, from, next) => {
  console.log(from.path)
  console.log(to.path)
  // 判断用户是否登录, 此处暂时用浏览器Cookie的ExpireAt
  let token = utils.getObjectFromLocalStorage("user")

  // 如果在路由白名单中则放行, 并且可能还要传一些用户变量
  // 这里的判断可能还需要正则表达式来确定, 暂时先用列表判断

  // 为了方便测试，先不做拦截
  if (routerWhiteList.indexOf(to.path) !== -1) {
      next()
  } else {
      // 没在白名单中
      // 用户是登录状态
      if (!utils.isNullOrNil(token)) {
          // 如果登录状态过期
         next()
      } else {
          // 用户不是登录状态,跳转到login
          next('/admin/login')
      }
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
