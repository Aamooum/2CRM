import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('auth_token') || null,
    }),
    actions: {
        clearUserData() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('auth_token');
            delete axios.defaults.headers.common['Authorization'];
        },
        async fetchUser() {
            if (!this.token) {
                this.clearUserData();
                return Promise.reject('No token found');
            }
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
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
                this.token = response.data.token;
                localStorage.setItem('auth_token', this.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                return response.data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async register(payload) {
            try {
                const response = await axios.post('/register', payload);
                this.user = response.data.user;
                this.token = response.data.token;
                localStorage.setItem('auth_token', this.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
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
            } finally {
                this.clearUserData();
            }
        }
    }
});
