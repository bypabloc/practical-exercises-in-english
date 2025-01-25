
import { defineStore } from 'pinia'

export const useCookieStore = defineStore('cookies', {
  state: () => ({
    values: {}
  }),

  actions: {
    set(key, value) {
      const normalizedKey = key.replace('tfs-', '')
      this.values[normalizedKey] = value
    },

    get(key) {
      const normalizedKey = key.replace('tfs-', '')
      return this.values[normalizedKey] || null
    },

    setMultiple(cookies) {
      const normalizedCookies = {}
      Object.entries(cookies).forEach(([key, value]) => {
        const normalizedKey = key.replace('tfs-', '')
        normalizedCookies[normalizedKey] = value
      })
      this.values = { ...this.values, ...normalizedCookies }
    }
  }
})
