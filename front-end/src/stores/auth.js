import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(async config => {
    if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
        try {
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
        } catch (error) {
            console.error('Failed to get CSRF cookie:', error);
            return Promise.reject(error);
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),
    actions: {
        clearUserData() {
            this.user = null;
        },
        async fetchUser() {
            try {
                const response = await axios.get('/profile');
                this.user = response.data;
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                this.clearUserData();
                return Promise.reject(error);
            }
        },
        async login(payload) {
            try {
                const response = await axios.post('/login', payload);
                this.user = response.data.user;
                return response.data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async register(payload) {
            try {
                const response = await axios.post('/register', payload);
                this.user = response.data.user;
                return response.data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async updateProfile(payload) {
            try {
                const response = await axios.patch('/profile', payload);
                this.user = response.data.user;
                return response.data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async logout() {
            try {
                await axios.post('/logout');
                this.clearUserData();
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }
});