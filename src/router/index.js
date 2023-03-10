import { createRouter, createWebHashHistory } from 'vue-router'
import store from './../store'
import NotFund from '../views/NotFund.vue'
import SignIn from '../views/SignIn.vue'
import HomePage from '../views/HomePage.vue'
import CheckIn from '../views/CheckIn.vue'
import ChangePassword from '../views/ChangePassword.vue'
import QRcodeGenerate from '../views/QRcodeGenerate.vue'
import QRcodeReader from '../views/QRcodeReader.vue'
import CheckRecord from '../views/CheckRecord.vue'
import EditCompany from '../views/admin/EditCompany.vue'
import unlockedUser from '../views/admin/UnlockedUser.vue'


const authorizeIsUser = (to, from, next) => {
  // 判斷是否為使用者
  if(!store.state.isAuthenticatedUser) return next('/HomePage')
  return next()
}

const authorizeIsAdmin = (to, from, next) => {
  if (!store.state.isAuthenticatedAdmin) return next('/HomePage')
  return next()
}

const routes = [
  {
    path: '/',
    name: 'root',
    component: SignIn,
    beforeEnter: (to, from, next) => {
      if (store.state.isAuthenticatedUser || store.state.isAuthenticatedAdmin) return next('/HomePage')
      return next()
    }
  },
  {
    path: '/SignIn',
    name: 'sign-in',
    component: SignIn,
    alias: '/',
    beforeEnter: (to, from, next) => {
      if (store.state.isAuthenticatedUser || store.state.isAuthenticatedAdmin) return next('/HomePage')
      return next()
    }
  },
  {
    path: '/HomePage',
    name: 'home-page',
    component: HomePage
  },
  {
    path: '/CheckIn',
    name: 'check-in',
    component: CheckIn,
    beforeEnter: (to, from, next) => authorizeIsUser(to, from, next)
  },
  {
    path: '/ChangePassword',
    name: 'change-password',
    component: ChangePassword,
    beforeEnter: (to, from, next) => authorizeIsUser(to, from, next)
  },
  {
    path: '/QRcodeGenerate',
    name: 'QRcode-generate',
    component: QRcodeGenerate
  },
  {
    path: '/QRcodeReader',
    name: 'QRcode-reader',
    component: QRcodeReader
  },
  {
    path: '/CheckRecord',
    name: 'check-record',
    component: CheckRecord,
    beforeEnter: (to, from, next) => authorizeIsUser(to, from, next)
  },
  {
    path: '/admin/EditCompany',
    name: 'edit-company',
    component: EditCompany,
    beforeEnter: (to, from, next) => authorizeIsAdmin(to, from, next)
  },
  {
    path: '/admin/UnlockedUser',
    name: 'unlocked-user',
    component: unlockedUser,
    beforeEnter: (to, from, next) => authorizeIsAdmin(to, from, next)
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFund
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 為不需token即可進入的頁面
  const pathsWithoutAuthentication = ['root', 'sign-in', 'QRcode-generate', 'QRcode-reader']

  // 當進入的頁面需toekn，重新獲取資訊
  if (!pathsWithoutAuthentication.includes(to.name)) {
    // 先判斷是否有token
    if (localStorage.key('token') === null) return next('/SignIn')

    store.dispatch('fetchCurrentUser')
      .then(() => {
        // 取得資訊後,再判斷是否有登入成功
        if (!store.state.isAuthenticatedAdmin && !store.state.isAuthenticatedUser) return next('/SignIn')
      })
  } 
  return next()
  
})

export default router
