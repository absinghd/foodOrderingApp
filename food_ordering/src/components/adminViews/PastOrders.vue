<template>
    <v-app class="mainContainer">
      <p class="title">Past Orders</p>

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
            <v-list-item @click="gotoPastOrder">
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






<div class="completed">
    <v-card class="orders" v-for="(order,e) in orders" :key="e">
      
      <div class="completedOrders">
          <a>{{order.time}}</a>
      
      <p>Name: {{order.customerName}}</p>
      <p>Order: 
      </p>
      
      <p v-for="(item,u) in order.menuItems" :key="u">
        <a v-if="item.quantity > 0">
        <a>{{item.quantity}} </a>
        <a>{{item.name}}</a>
        </a>
      </p>
      
      </div>
      
    </v-card>
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
          this.$store.commit("setAdminFalse")
        this.$store.commit("setUserLogout")
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
        orderCompleted(order,e){
          //console.log(order.orderId);
          const db = firebase.firestore();
        //update the document status
        const de = db.collection("orders").doc(order.orderId);
       de.update({
          completed: true
        })
  //  //update this.orders
        this.orders[e].completed = true;
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
        //console.log(this.orders);
        //this.user = this.$store.getters.getUser;
        //this.$store.commit("setCooks", this.cooks);
    }

}

</script>

<style scoped>
.mainContainer {
  background-color: #74cae0;
  padding: 10px;
}
.tab {
  color: #424242;
}
.openOrders{
  background-color: rgb(255,197,41,.8);
  padding: 5px;
}
.completedOrders{
  background-color: #d9f5fc;
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
.title{
    text-align: center;
    margin-bottom: -10px;
}
</style>