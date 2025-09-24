import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import TasksPage from '@/pages/TasksPage.vue';
import NotFound from '@/components/organisms/NotFound.vue';
import NotificationsPage from '@/pages/NotificationsPage.vue';
import { useAuthStore } from '@/stores/auth';
import ProfilePage from '@/pages/ProfilePage.vue';

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
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: {
      requiresAuth: true,
      title: 'My Profile - 2CRM'
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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Try to fetch the user to check if the session is still valid
  if (!authStore.user) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      // If fetching the user fails, it means the session is invalid
      // The store's fetchUser action will already clear the state.
    }
  }

  const isAuthenticated = !!authStore.user; // Check for the user object

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