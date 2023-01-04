import { createRouter, createWebHashHistory } from 'vue-router'
import NotFund from '../views/NotFund.vue'
import SignIn from '../views/SignIn.vue'
import HomePage from '../views/HomePage.vue'
import CheckIn from '../views/CheckIn.vue'
import ChangePassword from '../views/ChangePassword.vue'
import QRcodeGenerate from '../views/QRcodeGenerate.vue'
import QRcodeReader from '../views/QRcodeReader.vue'
import CheckRecord from '../views/CheckRecord.vue'

const routes = [
  {
    path: '/',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/HomePage',
    name: 'home-page',
    component: HomePage
  },
  {
    path: '/CheckIn',
    name: 'check-in',
    component: CheckIn
  },
  {
    path: '/changePassword',
    name: 'change-password',
    component: ChangePassword
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
    path: '/checkRecord',
    name: 'check-record',
    component: CheckRecord
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

export default router
