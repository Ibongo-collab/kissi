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
    path: '/tableau-de-bord',
    name: 'Tableau-de-bord',
    meta: {
      requiresAuth: true // indique que cette route nécessite une authentification
    },
    beforeEnter: Middleware, // utilise le middleware pour vérifier l'authentification
    component: () => import(/* webpackChunkName: "Login" */ '../views/Tableau-de-bord.vue')
  },
  // {
  //   path: '/verification-email',
  //   name: 'Verification-email',
  //   component: () => import(/* webpackChunkName: "Verification-email" */ '../views/Verification-email.vue')
  // },
  // {
  //   path: '/password-reset',
  //   name: 'Password-reset',
  //   component: () => import(/* webpackChunkName: "password-reset" */ '../views/Password-reset.vue')
  // },
  // {
  //   path: '/change-password',
  //   name: 'Change-password',
  //   component: () => import(/* webpackChunkName: "change-password" */ '../views/Change-password.vue')
  // },
  // {
  //   path: '/checkout',
  //   name: 'Checkout',
  //   component: () => import(/* webpackChunkName: "checkout" */ '../views/Checkout.vue')
  // },

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
