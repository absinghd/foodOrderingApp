<template>
    <v-app class="mainContainer">


    <div class="drawer">

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
          <v-list-item @click="gotoOrders">
            <v-list-item-icon>
              <v-icon>mdi-cart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Orders</v-list-item-title>
          </v-list-item>

          <v-list-item @click="gotoMenu">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item>

            <!-- <v-list-item @click="goCustomerHistory"> -->
            <v-list-item >
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Past Orders</v-list-item-title>
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


    </div>








        <a>orders</a>
    </v-app>
</template>


<script>
import firebase from 'firebase'

export default {
    name: 'Orders',
    data(){
        return{
          group: null,
          user: this.$store.getters.getUser,
          orders:[],  
        }
    },
    computed:{
        drawer: {
           get(){
             return this.$store.getters.getDrawer;
           },
           set(){
             return null
           } 
        },
    },
    methods:{
        logout(){
            this.$router.push({ 
            name: "Login"}) 
        },
        gotoOrders(){
            this.$router.push({ 
            name: "Orders"}) 
        },
        gotoMenu(){
            this.$router.push({ 
            name: "Menu"}) 
        }
    },
    created(){
        const db = firebase.firestore();
        //get all the orders
        const de = db.collection("orders").where("menuItems.cook_uid", "==", "this.user.uid");
      
        de.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let order = doc.data();
            this.orders.push(order)
          })})
        console.log(this.orders);
        //this.user = this.$store.getters.getUser;
        //this.$store.commit("setCooks", this.cooks);
    }

}
</script>

<style scoped>
.mainContainer {
  background-color: #ffe9ae;
}
</style>