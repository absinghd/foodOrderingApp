import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerHome from '@/components/home/CustomerHome'
import Login from '@/components/auth/Login'
import CookMenu from '@/components/views/CookMenu'
import ThankYou from '@/components/views/ThankYou'
import Orders from '@/components/adminViews/Orders'
import Menu from '@/components/adminViews/Menu'
import NewMenuItem from '@/components/adminViews/NewMenuItem'
import CurrentOrder from '@/components/views/CurrentOrder'
import History from '@/components/views/History'
import CustomerProfile from '@/components/views/CustomerProfile'
import PastOrders from '@/components/adminViews/PastOrders'
import Login_00 from '@/components/auth/Login_00'
import SuccessfulLogin from '@/components/auth/SuccessfulLogin'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'CustomerHome',
    component: CustomerHome
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login_00',
    name: 'Login_00',
    component: Login_00
  },
  {
    path: '/success',
    name: 'SuccessfulLogin',
    component: SuccessfulLogin
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
  },
  {
    path: '/curretOrder',
    name: 'CurrentOrder',
    component: CurrentOrder
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/customerProfile',
    name: 'CustomerProfile',
    component: CustomerProfile
  },
  {
    path: '/pastOrders',
    name: 'PastOrders',
    component: PastOrders
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})





export default router
