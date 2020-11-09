import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerHome from '@/components/home/CustomerHome'
import AdminHome from '@/components/home/AdminHome'
import Login from '@/components/auth/Login'
import CookMenu from '@/components/views/CookMenu'
import ThankYou from '@/components/views/ThankYou'
import Orders from '@/components/adminViews/Orders'
import Menu from '@/components/adminViews/Menu'
import NewMenuItem from '@/components/adminViews/NewMenuItem'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CustomerHome',
    component: CustomerHome
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/adminHome',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/cookMenu/:cook',
    name: 'CookMenu',
    component: CookMenu
  },
  {
    path: '/thankYou',
    name: 'ThankYou',
    component: ThankYou
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/addNewMenuItem',
    name: 'NewMenuItem',
    component: NewMenuItem
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
