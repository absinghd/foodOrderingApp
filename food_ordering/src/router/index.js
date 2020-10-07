import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerHome from '@/components/home/CustomerHome'
import AdminHome from '@/components/home/AdminHome'
import CustomerLogin from '@/components/auth/CustomerLogin'
import AdminLogin from '@/components/auth/AdminLogin'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CustomerHome',
    component: CustomerHome
  },
  {
    path: '/login',
    name: 'CustomerLogin',
    component: CustomerLogin
  },
  {
    path: '/adminLogin',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/adminHome',
    name: 'AdminHome',
    component: AdminHome
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
