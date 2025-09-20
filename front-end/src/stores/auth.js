import { defineStore } from 'pinia';
import axios from 'axios';

const token = localStorage.getItem('auth_token');
if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: token,
        user: null 
    }),
    actions: {
        setToken(newToken) {
            this.token = newToken;
            localStorage.setItem('auth_token', newToken);
            axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        },
        clearToken() {
            this.token = null;
            this.user = null; 
            localStorage.removeItem('auth_token');
            delete axios.defaults.headers.common.Authorization;
        },
        async fetchUser() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/profile');
                this.user = response.data;
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                this.clearToken(); 
                return Promise.reject(error);
            }
        }
    }
});