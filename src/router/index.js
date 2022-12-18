import { createRouter, createWebHashHistory } from 'vue-router'
import NotFund from '../views/NotFund.vue'

const routes = [
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
