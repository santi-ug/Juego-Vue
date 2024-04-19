import { createRouter, createWebHistory } from 'vue-router'
import AgentSelectView from '../views/AgentSelectView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView// Wrap the component name in curly braces
    },
    {
      path: '/agent-select',
      name: 'agent-select',
      component: AgentSelectView  // Wrap the component name in curly braces
    },
  ]
})

export default router
