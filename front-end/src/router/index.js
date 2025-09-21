import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import TasksPage from '@/pages/TasksPage.vue';
import NotFound from '@/components/organisms/NotFound.vue';
import NotificationsPage from '../pages/NotificationsPage.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      guest: true,
      title: 'Login - 2CRM'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: {
      guest: true,
      title: 'Register - 2CRM'
    }
  },
  {
    path: '/',
    redirect: '/tasks',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'tasks',
        name: 'TaskList',
        component: TasksPage,
        meta: {
          title: 'My Tasks - 2CRM'
        }
      }
    ]
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: NotificationsPage,
    meta: {
      requiresAuth: true,
      title: 'Notifications - 2CRM'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Page Not Found - 2CRM'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token;

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isGuest = to.matched.some(record => record.meta.guest);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (isGuest && isAuthenticated) {
    next({ name: 'TaskList' });
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title || '2CRM';
});

export default router;