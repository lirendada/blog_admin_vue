import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'

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

const whiteList = [ '/login' ]

// 登录验证
router.beforeEach((to, from) => {
  // 先获取token
  const userStore = useUserStore()
  const { user_token } = userStore

  if(user_token) {
    // 如果存在token，则说明已经登录
    if(to.path === '/login') {
      return '/' // 如果还想去登录，则直接跳转到主页去
    } else {
      return true;
    }
  } else {
    // 如果不存在token，则说明未登录，判断一下是否为白名单页面
    if(whiteList.includes(to.path)) {
      return true
    } else {
      ElMessage.error('请先登录！')
      return `/login?redirectUrl=${to.path}` // 重定向到登录页面，并且为了后面登录后能调回来，需要传参
    }
  }
})

export default router