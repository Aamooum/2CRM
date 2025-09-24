import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.withCredentials = true;

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
                // Update the user data in the store with the new data from the API
                this.user = response.data.user;
                return response.data;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async logout() {
            try {
                // The backend will clear the cookie and invalidate the token
                await axios.post('/logout');
                this.clearUserData();
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }
});