<template>
  <div class="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-2xl mt-10">
    <!-- Loader: Shows a circular loader when data is being fetched -->
    <div v-if="loading" class="text-center text-gray-500">
      <svg class="circular-loader" viewBox="25 25 50 50">
        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="5"></circle>
      </svg>
      <div class="text-center text-gray-500 mt-2">Loading...</div>
    </div>

    <!-- Display world data once it is fetched -->
    <div v-else-if="world" class="text-center">
      <button
        @click="goBack"
        class="px-6 py-2 mb-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200 ease-in-out"
      >
        Back
      </button>
      <div class="flex flex-col items-center space-y-6">
        <img
          :src="world.flag_url"
          :alt="world.name"
          class="w-28 h-28 rounded-full shadow-lg border-2 border-gray-300"
        />
        <h2 class="text-3xl font-bold text-gray-800">{{ world.name }}</h2>
        <p class="text-lg text-gray-600">ID: {{ world.id }}</p>
        <p>
          <a :href="world.url" target="_blank" class="text-blue-500 hover:underline break-all">
            {{ world.url }}
          </a>
        </p>
        <p class="text-lg text-gray-600">
          Location: ({{ world.start_position_lat }}, {{ world.start_position_long }})
        </p>
      </div>
    </div>

    <!-- Error state in case no world is found -->
    <div v-else>
      <p class="text-red-500 text-center">World not found.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useWorldStore } from '@/stores/worldStore'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const worldStore = useWorldStore()
    const route = useRoute()
    const router = useRouter()
    const worldId = parseInt(route.params.id as string)
    const loading = ref(true) // Add loading state for the detail component

    const world = computed(() => {
      return worldStore.worlds.find((world) => world.id === worldId)
    })

    // Simulate fetching with a delay (if needed) or wait for the store to load
    onMounted(async () => {
      if (!world.value) {
        loading.value = true
        await worldStore.loadWorlds() // Fetch worlds from the store
      }
      loading.value = false // Stop loading when done
    })

    const goBack = () => {
      router.push('/')
    }

    return {
      world,
      loading,
      goBack
    }
  }
})
</script>
