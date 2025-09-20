import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const authStore = useAuthStore()
const token = localStorage.getItem('auth_token')

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  
  authStore.fetchUser().finally(() => {
    app.mount('#app')
  })
} else {
  app.mount('#app')
}