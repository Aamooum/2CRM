import { defineStore } from 'pinia';

const NOTIFICATIONS_STORAGE_KEY = 'user-notifications';

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
  }),

  actions: {
    loadNotifications() {
      const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (storedNotifications) {
        this.notifications = JSON.parse(storedNotifications);
      }
    },

    saveNotifications() {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(this.notifications));
    },
    
    addNotification(newNotification) {
      this.notifications.unshift(newNotification);
      this.saveNotifications();
    },
    
    clearNotifications() {
      this.notifications = [];
      this.saveNotifications();
    },
  },
});