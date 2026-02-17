import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import AuthTest from '../views/AuthTest.vue'
import { isAuthenticated } from '@/services/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/forgotpassword',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/authtest',
      name: 'authtest',
      component: AuthTest,
      meta: { requiresAuth: true },
    },
  ],
})

// global guard: protect routes with `meta.requiresAuth` and redirect logged-in users away from login
router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated()
  if (to.meta && (to.meta as any).requiresAuth && !authenticated) {
    return next({ name: 'login' })
  }
  if (to.name === 'login' && authenticated) {
    return next({ name: 'authtest' })
  }
  return next()
})

export default router
