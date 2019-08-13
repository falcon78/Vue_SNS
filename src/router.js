import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './components/Dashboard';
import Login from './components/Dashboard';
import Settings from './components/Settings';

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

export default router;
