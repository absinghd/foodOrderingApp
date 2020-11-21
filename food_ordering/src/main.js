import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import 'firebase/firestore'

// import './cloudinary.js'
import axios from "axios";


let firebaseConfig = {
apiKey: "AIzaSyDQUZzp8BI-H-Vn3vUjLC35o4y-eZDEEs0",
authDomain: "foodordering-559.firebaseapp.com",
databaseURL: "https://foodordering-559.firebaseio.com",
projectId: "foodordering-559",
storageBucket: "foodordering-559.appspot.com",
messagingSenderId: "155394733334",
appId: "1:155394733334:web:2e6d03750096fa419e0c37",
measurementId: "G-FSTN3EWKWD"
}

if(process.env.VUE_APP_ENV === "prod"){
   firebaseConfig = {
    apiKey: "AIzaSyDZ0kohndQ3zkeRPpWlRK9AWzKRTwQhqQI",
    authDomain: "foodiefoodie-00.firebaseapp.com",
    databaseURL: "https://foodiefoodie-00.firebaseio.com",
    projectId: "foodiefoodie-00",
    storageBucket: "foodiefoodie-00.appspot.com",
    messagingSenderId: "1012897778532",
    appId: "1:1012897778532:web:40a48cc69b579567a34871",
    measurementId: "G-R5L6494M11"
   }
}

Vue.use(axios)
Vue.config.productionTip = false

console.log('this is', process.env.VUE_APP_ENV);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  // Your web app's Firebase configuration
  created() {


//DEVELOPMENT MODE
    // apiKey: "AIzaSyDQUZzp8BI-H-Vn3vUjLC35o4y-eZDEEs0",
    // authDomain: "foodordering-559.firebaseapp.com",
    // databaseURL: "https://foodordering-559.firebaseio.com",
    // projectId: "foodordering-559",
    // storageBucket: "foodordering-559.appspot.com",
    // messagingSenderId: "155394733334",
    // appId: "1:155394733334:web:2e6d03750096fa419e0c37",
    // measurementId: "G-FSTN3EWKWD"



//PRODUCTION MODE
    // apiKey: "AIzaSyDZ0kohndQ3zkeRPpWlRK9AWzKRTwQhqQI",
    // authDomain: "foodiefoodie-00.firebaseapp.com",
    // databaseURL: "https://foodiefoodie-00.firebaseio.com",
    // projectId: "foodiefoodie-00",
    // storageBucket: "foodiefoodie-00.appspot.com",
    // messagingSenderId: "1012897778532",
    // appId: "1:1012897778532:web:40a48cc69b579567a34871",
    // measurementId: "G-R5L6494M11"


  
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