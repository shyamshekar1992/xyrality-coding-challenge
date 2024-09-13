<template>
  <div class="relative">
    <!-- Conditional Rendering Based on Loading State -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
    >
      <svg class="circular-loader" viewBox="25 25 50 50">
        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="5"></circle>
      </svg>
      <div class="text-white text-center mt-4">Loading, please wait...</div>
    </div>

    <!-- Page content (World List) -->
    <div v-else class="container mx-auto p-4">
      <h1 class="text-3xl font-bold text-center mb-4">World List</h1>

      <!-- Display error message if there was a problem fetching data -->
      <div v-if="error" class="text-red-500 text-center">{{ error }}</div>

      <!-- Display the list of worlds when data is available -->
      <div v-else-if="sortedWorlds.length > 0">
        <div class="flex justify-center space-x-4 mb-4">
          <button
            @click="sortBy('id')"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap text-center"
          >
            Sort by ID
          </button>
          <button
            @click="sortBy('name')"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap text-center"
          >
            Sort by Name
          </button>
        </div>

        <!-- List of worlds displayed in a responsive grid -->
        <ul class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <li
            v-for="world in sortedWorlds"
            :key="world.id"
            @click="goToWorld(world.id)"
            class="cursor-pointer border border-gray-200 p-4 rounded shadow hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            <div class="flex items-center space-x-4">
              <!-- World flag image and name -->
              <img :src="world.flag_url" :alt="world.name" class="w-12 h-12 rounded-full" />
              <span class="text-lg font-medium">{{ world.name }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Handle no worlds case -->
      <div v-else class="text-center text-gray-500">No worlds found.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useWorldStore } from '@/stores/worldStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const worldStore = useWorldStore() // Access the store
    const router = useRouter() // Access the router for navigation
    const sortByField = ref<'id' | 'name'>('name') // Track sorting by ID or name

    // Load data when the component is mounted
    onMounted(() => {
      worldStore.loadWorlds() // Fetch worlds when the component mounts
    })

    // Computed property to get the loading state reactively
    const loading = computed(() => worldStore.loading)

    // Computed property to get the error state reactively
    const error = computed(() => worldStore.error)

    // Computed property to sort the world list based on sortByField
    const sortedWorlds = computed(() => {
      return [...worldStore.worlds].sort((a, b) => {
        if (sortByField.value === 'id') {
          return a.id - b.id // Sort by ID
        } else {
          return a.name.localeCompare(b.name) // Sort by Name
        }
      })
    })

    // Function to change the sorting field
    const sortBy = (field: 'id' | 'name') => {
      sortByField.value = field
    }

    // Function to navigate to the World Detail page
    const goToWorld = (id: number) => {
      router.push(`/world/${id}`) // Navigate to world detail page
    }

    return {
      loading, // Use the reactive loading state
      error, // Use the reactive error state
      sortedWorlds, // Sorted list of worlds
      goToWorld, // Navigate to world detail
      sortBy // Sorting function
    }
  }
})
</script>
