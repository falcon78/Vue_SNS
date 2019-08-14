import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Settings from './components/Settings';
import * as fb from './firebaseConfig';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: 'settings',
      component: Settings,
      requiresAuth: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((param) => param.meta.requiresAuth);
  const currentUser = fb.auth.currentUser;
  if (authRequired && !currentUser) {
    next('/login');
  } else if (authRequired && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
