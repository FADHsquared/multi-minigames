import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('../pages/Games/index.vue')
  },
  {
    path: '/games/tic-tac-toe/:room?',
    name: 'TicTacToe',
    component: () => import('../pages/Games/TicTacToe.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
