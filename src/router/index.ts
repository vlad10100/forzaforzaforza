import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //'/forza/'
  routes: [
    {
      name: 'home',
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
    {
      name: 'shop',
      path: `/shop/:sport/:productType/:category/:id`,
      component: () => import('@/views/Shop.vue')
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('@/views/Profile.vue')
    },
    {
      name: 'forza-strava-auth',
      path: '/forza-strava-auth',
      component: () => import('@/views/auth/ForzaStravaAuth.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
  ]
})

export default router
