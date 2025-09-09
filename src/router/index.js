import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: 'article',
          component: () => import('@/views/Article/index.vue')
        },
        {
          path: 'dashboard',
          component: () => import('@/views/Dashboard/index.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

export default router