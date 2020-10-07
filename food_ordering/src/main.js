import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import 'firebase/firestore'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  // Your web app's Firebase configuration
  created() {  var firebaseConfig = {
    apiKey: "AIzaSyDQUZzp8BI-H-Vn3vUjLC35o4y-eZDEEs0",
    authDomain: "foodordering-559.firebaseapp.com",
    databaseURL: "https://foodordering-559.firebaseio.com",
    projectId: "foodordering-559",
    storageBucket: "foodordering-559.appspot.com",
    messagingSenderId: "155394733334",
    appId: "1:155394733334:web:2e6d03750096fa419e0c37",
    measurementId: "G-FSTN3EWKWD"
  };
  firebase.initializeApp(firebaseConfig)
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

}
  

}).$mount('#app')
const db = firebase.firestore()

//collection refrences
const ordersCollection = db.collection('orders')

export default{
  db,
  ordersCollection
}