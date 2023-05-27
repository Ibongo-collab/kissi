import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Middleware from '../middleware.js'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rejoignez-kissi',
    name: 'Rejoignez-kissi',
    component: () => import(/* webpackChunkName: "rejoignez-kissi" */ '../views/Rejoignez-kissi.vue')
  },
  {
    path: '/recherche',
    name: 'Recherche',
    component: () => import(/* webpackChunkName: "Recherche" */ '../views/Recherche.vue')
  },
  {
    path: '/praticien',
    name: 'Praticien',
    component: () => import(/* webpackChunkName: "praticien" */ '../views/Praticien.vue')
  },
  {
    path: '/rdv',
    name: 'Rendez-vous',
    meta: {
      requiresAuth: true // indique que cette route nécessite une authentification
    },
    beforeEnter: Middleware, // utilise le middleware pour vérifier l'authentification
    component: () => import(/* webpackChunkName: "Rdv" */ '../views/Rdv.vue'),
  },
  {
    path: '/authentification',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: () => import(/* webpackChunkName: "Inscription" */ '../views/Inscription.vue')
  },
  {
    path: '/tableau-de-bord',
    name: 'Tableau-de-bord',
    meta: {
      requiresAuth: true // indique que cette route nécessite une authentification
    },
    beforeEnter: Middleware, // utilise le middleware pour vérifier l'authentification
    component: () => import(/* webpackChunkName: "Login" */ '../views/Tableau-de-bord.vue')
  },
  {
    path: '/password-forgot',
    name: 'Password-forgot',
    component: () => import(/* webpackChunkName: "Password-forgot" */ '../views/Password-forgot.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "Reset-password" */ '../views/Reset-password.vue')
  },
  {
    path: '*',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    // Retourne le haut de la page lors d'un changement de route
    return { x: 0, y: 0 }
  }
})

export default router
