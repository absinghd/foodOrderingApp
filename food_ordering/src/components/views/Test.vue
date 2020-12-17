<template>
    <v-app class="mainContainer">
        <p class="title">Test Page</p>

        <PayPalPayment></PayPalPayment>





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
import PayPalPayment from '../payment/PayPalPayment'
import firebase from 'firebase'


export default {
    name: 'History',
    data(){
        return{
            user: this.$store.getters.getUser,
            navbarTitle: this.$store.getters.getNavbarTitle,
            cook: this.$route.params.cook,
            group: null,

        }
    },
    components: {
        PayPalPayment
  },
  methods:{

        logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
        });
        this.$store.commit("setAdminFalse")
        this.$store.commit("setUserLogout")
        this.$router.push({ name: "Login" });
    },
        gotoOrders(){
            this.$router.push({ 
            name: "Orders"}) 
        },
        gotoMenu(){
            this.$router.push({ 
            name: "Menu"}) 
        },
        gotoPastOrder(){
            this.$router.push({ 
            name: "PastOrders"}) 
        },
  },

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
</style>