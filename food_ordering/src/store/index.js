import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters:{
    getUser: (state) => { return state.user; }
  },
  mutations: {
    setUser: state => { state.user = Firebase.auth().currentUser; 
  },
  actions: {
  },
  modules: {
  }
})
