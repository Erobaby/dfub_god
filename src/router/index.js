import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import UserStudentCode from '../components/UserStudentCode.vue'
import UserAccount from '../components/UserAccount.vue'
import UserLogin from '../components/UserLogin.vue'
import ClassInfo from '../components/ClassInfo.vue'
import ClassStudent from '../components/ClassStudent.vue'
import ClassLiveUrl from '../components/ClassLiveUrl.vue'
import SystemSetting from '../components/SystemSetting.vue'

Vue.use(VueRouter)
/** 全局路由 */
const routes = [{
  path: '/',
  meta: {
    requireAuth: true
  },
  component: Home
}, {
  path: '/user_student_code',
  meta: {
    requireAuth: true
  },
  component: UserStudentCode
}, {
  path: '/user_account',
  meta: {
    requireAuth: true
  },
  component: UserAccount
}, {
  path: '/user_login',
  meta: {
    requireAuth: false
  },
  component: UserLogin
}, {
  path: '/class_info',
  meta: {
    requireAuth: true
  },
  component: ClassInfo
}, {
  path: '/class_student',
  meta: {
    requireAuth: true
  },
  component: ClassStudent
}, {
  path: '/class_live_url',
  meta: {
    requireAuth: true
  },
  component: ClassLiveUrl
}, {
  path: '/system_setting',
  meta: {
    requireAuth: true
  },
  component: SystemSetting
}]

const router = new VueRouter({
  routes
})

export default router