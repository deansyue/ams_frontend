import { createRouter, createWebHashHistory } from 'vue-router'
import NotFund from '../views/NotFund.vue'
import SignIn from '../views/SignIn.vue'
import HomePage from '../views/HomePage.vue'
import CheckIn from '../views/CheckIn.vue'
import ChangePassword from '../views/ChangePassword.vue'

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
