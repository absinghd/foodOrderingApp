import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    admin: true,
    drawer: null
  },
  getters:{
    getUser: (state) => { return state.user; },
    getAdmin: (state) => { return state.admin},
    getDrawer: (state) => {return state.drawer}
  },
  mutations: {
    setUser: state => { state.user = Firebase.auth().currentUser},
    setAdminTrue: state => {state.admin = true},
    setAdminFalse: state => {state.admin = false},
    setDrawerTrue: state => {state.drawer = true}
  },
  actions: {
  },
  modules: {
  }
})
