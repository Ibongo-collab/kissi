import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recherche',
    name: 'Recherche',
    component: () => import(/* webpackChunkName: "Recherche" */ '../views/Recherche.vue')
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  // },
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
  {
    path: '/praticien/:id',
    name: 'Praticien',
    component: () => import(/* webpackChunkName: "praticien" */ '../views/Praticien.vue')
  },
  // {
  //   path: '/checkout',
  //   name: 'Checkout',
  //   component: () => import(/* webpackChunkName: "checkout" */ '../views/Checkout.vue')
  // },
  {
    path: '/rejoignez-kissi',
    name: 'Rejoignez-kissi',
    component: () => import(/* webpackChunkName: "rejoignez-kissi" */ '../views/Rejoignez-kissi.vue')
  },
  {
    path: '*',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
