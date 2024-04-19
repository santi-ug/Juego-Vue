import { createRouter, createWebHistory } from 'vue-router'
import AgentSelectView from '../views/AgentSelectView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/agent-select',
      name: 'agent-select',
      component: AgentSelectView  
    },
  ]
})

export default router
