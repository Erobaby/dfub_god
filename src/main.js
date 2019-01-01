import Vue from 'vue'

import Antd from 'ant-design-vue'
import App from './App.vue'
import store from './store'
import router from './router'
import common from './common'

import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(Antd)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 验证是否需要登陆
    if (store.getters.sessionUser.logonStatus) { // 查询本地存储信息是否已经登陆
      next();
    } else {
      next({
        path: '/user_login', // 未登录则跳转至login页面 
        query: {
          redirect: to.fullPath
        } // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面 
      });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')