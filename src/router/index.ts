// Importing necessary modules from Vue Router
import { createRouter, createWebHistory } from 'vue-router'

// Importing the components that will be used as views for the routes
import WorldList from '@/views/WorldList.vue'
import WorldDetail from '@/views/WorldDetail.vue'

// Defining the route configurations
const routes = [
  // Root path ('/') which renders the WorldList component
  { path: '/', component: WorldList },

  // Dynamic route to render the WorldDetail component based on the world 'id'
  { path: '/world/:id', component: WorldDetail }
]

// Creating a new router instance
const router = createRouter({
  // Configuring the router to use HTML5 history mode
  history: createWebHistory(),

  // Assigning the routes to the router
  routes
})

// Exporting the router instance to be used in the Vue application
export default router
