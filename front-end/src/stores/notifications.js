import { defineStore } from 'pinia';
import axios from 'axios';

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
  }),

  actions: {
    async fetchNotifications() {
      try {
        const response = await axios.get('/notifications');
        this.notifications = response.data;
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        this.notifications = [];
      }
    },

    async addNotification(message) {
      try {
        const response = await axios.post('/notifications', { message });
        this.notifications.unshift(response.data);
      } catch (error) {
        console.error('Failed to add notification:', error);
      }
    },
  },
});