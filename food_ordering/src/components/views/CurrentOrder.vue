<template>
    <v-app class="mainContainer">
        <p class="title">Current Orders</p>
        <a class="orders" v-for="(order, i) in openOrders" :key="i">
            <div class="orderItems">
        <a class="timestamp">{{timestamps[i]}}</a> <br>
            <a v-for="(item,x) in order.menuItems" :key="x">
                <a class="orderItem" v-if="item.quantity > 0 && item.quantity == 1">{{item.quantity}} {{item.name}}, </a>
                <a class="orderItem" v-if="item.quantity > 1">{{item.quantity}} {{item.name}}s, </a>
            </a>
            <br>
            <v-divider class="divider" light></v-divider>
</div>
<br>
        </a>


    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-orange--text text--accent-3"
        >
          <v-list-item @click="goCustomerHome">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="goCustomerProfile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

            <v-list-item @click="goCustomerHistory">
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>History</v-list-item-title>
          </v-list-item>

            <v-list-item @click="goCurrentOrder">
            <v-list-item-icon>
              <v-icon>mdi-cart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Current Order</v-list-item-title>
          </v-list-item>

            <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    </v-app>
</template>

<script>
import firebase from 'firebase'
import { format } from "date-fns";

export default {
    name: 'CurrentOrder',
    data(){
        return{
            user: this.$store.getters.getUser,
            navbarTitle: this.$store.getters.getNavbarTitle,
            cook: this.$route.params.cook,
            group: null,
            currentOrder: this.$store.getters.getCurrentOrder,
            openOrders:[],
            timestamps:[]

        }
    },
    computed:{
        // drawer(){
        //     return this.$store.getters.getDrawer;

        drawer: {
           get(){
             return this.$store.getters.getDrawer;
           },
           set(){
             return null
           } 
        },
    },
    methods: {
        goCustomerHome(){
            this.$router.push({ name: "CustomerHome" })
        },
        goCustomerProfile(){
            this.$router.push({ name: "CustomerProfile" })
        },
        goCustomerHistory(){
            this.$router.push({ name: "History" })
        },
        goCurrentOrder(){
            this.$router.push({ name: "CurrentOrder" })
        },
        logout() {
        firebase
            .auth()
            .signOut()
            .then(function() {
            });
            this.$store.commit("setAdminFalse")
            this.$router.push({ name: "Login" });
        },  
    },
    created(){
        const db = firebase.firestore();
        //get all the orders
        // const de = db.collection("orders").where("completed", "==", false);
        // de.collection("orders").where("customer_uid", "==", this.user.uid)
        const de = db.collection("orders").where("completed", "==", false);
        de.where("customer_uid", "==", this.user.uid)
        .orderBy('timestamp', 'desc')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let order = doc.data();
            this.openOrders.push(order)
            let timeS = order.timestamp.toDate();
            this.timestamps.push(format(timeS,"PPp"))
          })})

    }
}
</script>

<style scoped>
.mainContainer{
    background-color: #74cae0;
    padding: 10px;
}
.title{
    text-align: center;
}
.orderItems{
    margin-top: 5px;
    margin-left: 10px;
}
.orders{
    margin-top: 5px;
}
.timestamp{
 
  color: #424242;
}
.orderItem{
  color: #d9f5fc;
}
.divider{
  margin-top: 15px;
  margin-bottom: -20px;
}
</style>