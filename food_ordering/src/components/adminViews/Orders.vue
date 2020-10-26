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


<div class="tabs">

   
    <v-tabs
      v-model="tab"
      background-color=#ffe9ae
      color=#424242
      slider-color=#FE724C
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>


    </v-tabs>


<div class="openTab" v-if="!this.tab">
    <div class="orders" v-for="(order,e) in orders" :key="e">
      <v-card class="openOrders" v-if="order.completed==false">
      <p>Name: {{order.customerName}}</p>
      <p>Order:</p>
      <p v-for="(item,u) in order.menuItems" :key="u">
        <a>{{item.quantity}} </a>
        <a>{{item.name}}</a>
      </p>
      <v-btn @click="orderCompleted(order)">mark complete</v-btn>
      </v-card>
    </div>
</div>

<div class="completed" v-if="this.tab">
    <v-card class="orders" v-for="(order,e) in orders" :key="e">
      <div class="completedOrders" v-if="order.completed==true">
      <p>Name: {{order.customerName}}</p>
      <p>Order:</p>
      <p v-for="(item,u) in order.menuItems" :key="u">
        <a>{{item.quantity}} </a>
        <a>{{item.name}}</a>
      </p>
      </div>
    </v-card>
</div>
 


</div>


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
          tab: false,
        items: [
          { tab: 'Open Orders'},
          { tab: 'Completed'},],
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
        },
        orderCompleted(order){
          console.log(order.menuItems);
        }
    },
    created(){
        const db = firebase.firestore();
        //get all the orders
        db.collection("orders").where("cook_uid", "==", this.user.uid)
        .get()
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
.tab {
  color: #424242;
}
.openOrders{
  background-color: #FFC529;
  padding: 5px;
}
.completedOrders{
  background-color: #FFC529;
  padding: 5px;
}
.completed{
  padding: 10px;
}
.openTab{
  padding: 10px;
}
.orders{
  margin-top: 10px;
}
</style>