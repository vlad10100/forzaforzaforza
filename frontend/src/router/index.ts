import { createRouter, createWebHistory } from 'vue-router'
import { useCommonStore } from '@/stores/common'

const router = createRouter({
  history: createWebHistory('/beta/'),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/Home.vue')
    },
    {
      name: 'run',
      path: '/run',
      component: () => import('@/views/app/Run.vue'),
      meta: { requiresAuth: true }
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
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      name: 'forza-strava-auth',
      path: '/forza-strava-auth',
      component: () => import('@/views/auth/ForzaStravaAuth.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
  ]
})

// Auth guard
router.beforeEach((to, from, next) => {
  const commonStore = useCommonStore()
  const isAuthenticated = commonStore.signedInUser

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
