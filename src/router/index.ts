import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'dashboard',
      path: '/',
      component: () => import('@/views/Home.vue')
    },
    {
      name: 'run',
      path: '/run',
      component: () => import('@/views/Run.vue')
    },
    {
      name: 'calendar',
      path: '/calendar',
      component: () => import('@/views/Calendar.vue')
    },
    {
      name: 'sale',
      path: '/sale',
      component: () => import('@/views/Sale.vue')
    },
    {
      name: 'about-us',
      path: '/about-us',
      component: () => import('@/views/AboutUs.vue')
    },
    {
      name: 'sign-in',
      path: '/sign-in',
      component: () => import('@/views/auth/SignIn.vue')
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/auth/Register.vue')
    },
  ]
})

export default router
