import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    admin: false,
    drawer: null,
    cooks:null,
    navbarTitle: null,
    currentOrder:null
  },
  getters:{
    getUser: (state) => { return state.user; },
    getAdmin: (state) => { return state.admin},
    getDrawer: (state) => {return state.drawer},
    getCooks: (state) => {return state.cooks},
    getNavbarTitle: (state) => {return state.navbarTitle},
    getCurrentOrder: (state) => {return state.currentOrder}
  },
  mutations: {
    setUser: state => { state.user = Firebase.auth().currentUser},
    setAdminTrue: state => {state.admin = true},
    setAdminFalse: state => {state.admin = false},
    setDrawerTrue: state => {state.drawer = true},
    setDrawerFalse: state => {state.drawer = false},
    setNavbarTitle: (state,title) => {state.navbarTitle = title},
    setCooks: (state, cooks) => {state.cooks = cooks},
    setCurrentOrder: (state, menuItems) => {state.currentOrder = menuItems}
  },
  actions: {
  },
  modules: {
  }
})
