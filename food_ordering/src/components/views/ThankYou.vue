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


    </div>


        

        <a class="thankYou">Thanks for placing your order <br>{{this.user.displayName}}!</a>
        <p class="order">Here is what you ordered from {{this.cook.name}}: <a>
            <p v-for="(item, i) in menuItems" :key="i">
              <a v-if="item.quantity == 1">
            - {{item.quantity}} order of {{item.name}}
            </a>
              <a v-if="item.quantity > 1">
            - {{item.quantity}} orders of {{item.name}}s
            </a>
            </p>
            </a></p>

            <p class="venmoText"> You can make a Venmo payment <br> of ${{this.total}} to <b>{{this.cook.venmo}}</b>.</p>

<!--Copy Venmo ID Button
<div class="copyButton">
            <v-btn
  @click="copyVenmoId"
  elevation="2"
  color="#3d95ce"
  width="180"
>Copy Venmo ID</v-btn>
</div>
-->

    </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'ThankYou',
    data(){
        return{
            user: this.$route.params.user,
            cook:this.$route.params.cook,
            menuItems: this.$route.params.menuItems,
            group: null,
            total: this.$route.params.total,

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
    methods:{
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
    // copyVenmoId(){
    //   console.log();
    // }
    }
}
</script>

<style scoped>
.mainContainer{
    background-color: #74cae0;
    padding: 10px;
}
.thankYou{
  text-align: center;
  color: white;
  font-size: 20px;
}
.order{
  margin-top: 10px;
}
.venmoText{
  text-align: center;
}
.copyButton{
  text-align: center;
}
</style>