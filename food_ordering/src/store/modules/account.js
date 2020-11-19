import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Firebase from 'firebase'

Vue.use(Vuex);

export default 

new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      user: null,
      admin: false,
    },
    getters:{
        getUser: (state) => { return state.user; },
        getAdmin: (state) => { return state.admin},
    },
    mutations: {
        setUser: state => { state.user = Firebase.auth().currentUser},
        setUserLogout: state => {state.user = null},
        setAdminTrue: state => {state.admin = true},
        setAdminFalse: state => {state.admin = false},
    }
})