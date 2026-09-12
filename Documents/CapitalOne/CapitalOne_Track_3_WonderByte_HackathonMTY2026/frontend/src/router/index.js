import { createRouter, createWebHistory } from 'vue-router'

import Inicio from '../views/Inicio.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    }
  ]
})

export default router