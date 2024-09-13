import { defineStore } from 'pinia'
import { fetchWorlds } from '@/services/worldService'

export const useWorldStore = defineStore('worldStore', {
  state: () => ({
    worlds: [] as any[], // Array of worlds
    loading: true, // Loading state
    error: null as string | null // Error state
  }),
  actions: {
    async loadWorlds() {
      try {
        const worldsData = await fetchWorlds() // Fetch world data
        this.worlds = worldsData // Store the fetched world data
        this.loading = false // Set loading to true before fetching
      } catch (error: any) {
        this.error = error.message || 'Failed to load worlds' // Handle any errors
      }
    }
  }
})
