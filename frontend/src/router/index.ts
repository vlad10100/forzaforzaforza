import { createRouter, createWebHistory } from 'vue-router'
import { USER_KEY } from '@/stores/user'

const router = createRouter({
  history: createWebHistory('/beta/'),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/Home.vue'),
    },
    {
      name: 'run',
      path: '/run',
      component: () => import('@/views/app/Run.vue'),
      meta: { requiresAuth: true, requiresProfile: true },
    },
    {
      name: 'calendar',
      path: '/calendar',
      component: () => import('@/views/Calendar.vue'),
    },
    {
      name: 'sale',
      path: '/sale',
      component: () => import('@/views/Sale.vue'),
    },
    {
      name: 'about-us',
      path: '/about-us',
      component: () => import('@/views/AboutUs.vue'),
    },
    {
      name: 'auth',
      path: '/auth',
      component: () => import('@/views/auth/Auth.vue'),
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/auth/Register.vue'),
    },
    {
      name: 'shop',
      path: `/shop/:sport/:productType/:category/:id`,
      component: () => import('@/views/Shop.vue'),
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: 'test',
      path: '/test',
      component: () => import('@/views/Test.vue'),
    },
    {
      name: 'forza-strava-auth',
      path: '/forza-strava-auth',
      component: () => import('@/views/auth/ForzaStravaAuth.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
})

// Auth guard
router.beforeEach(async (to, _from, next) => {
  const user = JSON.parse(localStorage.getItem(USER_KEY) as string)

  // If the route requires auth and the user is not logged in, redirect to /auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user || !user.email || !user.user_id) {
      next({
        path: '/auth',
      })
    }
  }

  // If the route requires a profile and the user has not set one up, redirect to /profile
  if (to.matched.some(record => record.meta.requiresProfile)) {
    if (!user.username) {
      next({
        path: '/profile',
      })
    }
  }
  next()
})
export default router
