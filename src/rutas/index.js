import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../vistas/Inicio.vue') },
    { path: '/detalle/:id', component: () => import('../vistas/Detalle.vue') },
    { path: '/favoritos', component: () => import('../vistas/Favoritos.vue') },
    { path: '/recomendador', component: () => import('../vistas/Recomendador.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from) {
    if (to.path !== from.path) return { top: 0 }
  },
})

export default router
