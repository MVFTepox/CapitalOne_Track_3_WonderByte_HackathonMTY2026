import { createRouter, createWebHistory } from 'vue-router'

import Inicio from '../views/Inicio.vue'
import Login from '../views/Login.vue'
import Movimientos from '../views/movimientos.vue'
import MovimientoReportes from '../views/MovimientoReportes.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/inicio',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/movimientos',
      name: 'Movimientos',
      component: Movimientos
    },
    {
      path: '/reportes',
      name: 'MovimientoReportes',
      component: MovimientoReportes
    }
  ]
})

export default router