import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/auth';

axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;
axios.defaults.withCredentials = true;

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const authStore = useAuthStore();

authStore.fetchUser().finally(() => {
  app.mount('#app');
});